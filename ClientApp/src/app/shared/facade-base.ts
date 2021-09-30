import { BehaviorSubject, combineLatest, merge, Subject, throwError, of, Observable } from 'rxjs';
import { catchError, map,scan, shareReplay, tap, concatMap,mergeMap, switchMap } from 'rxjs/operators';
import { FileResponse } from '../api-client-generated';

export abstract class FacadeBase<TResource extends IEntity> {
  constructor(protected entityService: IHttpClient<TResource>) { }
  // All entities
  getAll$ = this.entityService.getAll().pipe(
    shareReplay(1),
  );
  // This could instead be one notification and emit the CrudOperation
  // But then the components would need to know about CRUD operations
  // This way, the components can subscribe to only the operations they require.
  private addCompletedSubject = new Subject<TResource>();
  addCompleted$ = this.addCompletedSubject.asObservable();
  private deletedCompleteSubject = new Subject<TResource>();
  deletedComplete$ = this.deletedCompleteSubject.asObservable();
  private updatedCompleteSubject = new Subject<TResource>();
  updatedComplete$ = this.updatedCompleteSubject.asObservable();
  private errorSubject = new Subject<any>();
  errorComplete$ = this.errorSubject.asObservable();
  private httpActionSubject = new Subject<CrudAction<TResource>>();
  // Saves to the backend AND modifies the array
  getAllLatest$ = merge(
    this.getAll$,
    this.httpActionSubject.asObservable().pipe(
      // Save the operation to the backend
      concatMap(action => this.sendHttpRequest(action))
    )
  ).pipe(
    // Modify the retained array
    scan((acc: TResource[], action: CrudAction<TResource>) => {
      if (action.action === HttpActionEnum.Add) {
        return [...acc, action.entity];
      } else if (action.action === HttpActionEnum.Update) {
        return acc.map(p => (p.id === action.entity.id ? action.entity : p));
      } else if (action.action === HttpActionEnum.Delete) {
        return acc.filter(p => p.id !== action.entity.id);
      } else if (action.action === HttpActionEnum.Error) {
        return [...acc];
      }
      return [...acc];
    }),
    // Ensure that the
    shareReplay(1),
    catchError(err => {
      return throwError(err);
    })
  );
  private sendHttpRequest(action: CrudAction<TResource>): Observable<CrudAction<TResource>> {
    if (action.action === HttpActionEnum.Add) {
      return this.entityService.post(action.entity).pipe(
        map(entity => ({
          action: HttpActionEnum.Add,
          entity: entity
        })),
        tap(entityAction => this.addCompletedSubject.next(entityAction.entity)),
        catchError(err =>{
          this.errorSubject.next(err);
          return of({
            action: HttpActionEnum.Error,
            entity: null,
          })
        })
      );
    } else if (action.action === HttpActionEnum.Update) {
      return this.entityService.put(action.entity.id, action.entity).pipe(
        map(entity => ({
          action: HttpActionEnum.Update,
          entity: entity
        })),
        tap(entityAction => this.updatedCompleteSubject.next(entityAction.entity)),
        catchError(err =>{
          this.errorSubject.next(err);
          return of({
            action: HttpActionEnum.Error,
            entity: null,
          })
        })
      );
    } else if (action.action === HttpActionEnum.Delete) {
      // Delete does not return the entity, so map to return
      // the deleted entity
      return this.entityService.delete(action.entity.id).pipe(
        map(() => action),
        tap(entityAction => this.deletedCompleteSubject.next(entityAction.entity)),
        catchError(err =>{
          this.errorSubject.next(err);
          return of({
            action: HttpActionEnum.Error,
            entity: null,
          })
        })
      );
    }
    return of(action);
  }
  // Action stream for entity selection
  // Default to 0 for no entity
  // Must have a default so the stream emits at least once.
  private entitySelectedSubject = new Subject<TResource>();
  // Change the selected entity
  // Currently selected entity
  // Used in both List and Detail pages,
  // so use the shareReply to share it with any component that uses it
  selectedEntity$ = this.entitySelectedSubject.asObservable().pipe(
    map(entity => entity ? entity : this.intialize())
  );
  //when someone calls this public api
  select(entity: TResource): void {
    this.entitySelectedSubject.next(entity);
    this.errorSubject.next(null)
  }

  save(entity: TResource) {
    entity.id === 0
      ? this.httpActionSubject.next({action: HttpActionEnum.Add, entity: entity})
      : this.httpActionSubject.next({action: HttpActionEnum.Update, entity: entity});
  }
  delete(entity: TResource): void {
    this.httpActionSubject.next({action: HttpActionEnum.Delete, entity: entity});
  }
  abstract intialize(): TResource;
}
export interface IHttpClient<TResource> {
  getAll(): Observable<TResource[]>;
  post(model: any): Observable<TResource>;
  get(id: number): Observable<TResource>;
  put(id: number, model: any): Observable<TResource>;
  delete(id: number): Observable<FileResponse>;
}
export interface CrudAction<T extends IEntity >{
  action:HttpActionEnum;
  entity : T;
}
export enum HttpActionEnum{
  None =0,
  Add=1,
  Update=2,
  Delete=-1,
  Error= -2
}
export interface IEntity{
  id?:number;
}
