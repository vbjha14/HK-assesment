import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      //retry(2),
      catchError(this.handleHttpErrorResponse)
    );
  }
  private handleHttpErrorResponse(err: HttpErrorResponse) {

    return from(err.error.text()).pipe(
      switchMap((errMsgFromServer: string) => {

        let problemDetails: ProblemDetails;

        if (err.error instanceof ErrorEvent) {
          // client-side error
          problemDetails = ({
            type: `Client Side error`,
            title: `Client Error`,
            detail: `${err.error.message}`
          });
        }

        else {
          // server-side error
          if (err.status == 400 || err.status == 404) {
            problemDetails = JSON.parse(errMsgFromServer);
          }

          else if (err.status == 401) {
            problemDetails = ({
              type: `https://tools.ietf.org/html/rfc7235#section-3.1`,
              title: `Unauthorized`,
              status: 401,
              detail: `Login Required`
            })
          }

          else if (err.status == 403) {
            problemDetails = ({
              type: `https://tools.ietf.org/html/rfc7231#section-6.5.3`,
              title: `Unauthorized`,
              status: 403,
              detail: `Access Forbidden`
            })
          }
          else {
            if (errMsgFromServer) {
              problemDetails = JSON.parse(errMsgFromServer);
            }
            else {
              problemDetails = ({
                type: `https://tools.ietf.org/html/rfc7231#section-6.6.1`,
                title: `Unknown Error/Internal Server Error`,
                status: err.status,
                detail: err.message
              })
            }
          }
          console.log(errMsgFromServer);
          console.log(problemDetails);
          // this.toastr.error(problemDetails.detail);
          return throwError(problemDetails);
        }

      }));
  }
}
export interface ProblemDetails {
  type: string;
  title: string;
  status?: number;
  detail: string;
  instance?: string;
}
  // private handleHttpErrorResponse(error: HttpErrorResponse) : Observable<any> {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }



//import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor, HttpResponse} from '@angular/common/http';
//import { Observable, throwError } from 'rxjs';
//import { catchError, retry, map } from 'rxjs/operators';
//import { ToastrService } from 'ngx-toastr';
//import { Injectable } from '@angular/core';
////https://stackoverflow.com/questions/46019771/catching-errors-in-angular-httpclient
//@Injectable()
//export class ErrorInterceptor implements HttpInterceptor {
//  constructor(private toastr: ToastrService) {}
//  intercept(
//    req: HttpRequest<any>,
//    next: HttpHandler
//  ): Observable<HttpEvent<any>> {

//    return next.handle(req).pipe(
//      //retry(2),
//      catchError((error: HttpErrorResponse) => {

//        let errorMessage = '';

//        if (error.error instanceof ErrorEvent) {
//            // client-side error
//            errorMessage = `Error: ${error.error.message}`;
//        }

//        else {
//            // server-side error
//            switch (error.status) {
//                case 400:
//                  if(error.error.errorMessage){
//                    errorMessage = `Error Status: ${error.status}\nMessage: ${error.error.errorMessage}`;
//                  }
//                  else{
//                    errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
//                  }
//                  break;
//                case 401:
//                    errorMessage = `login required`;
//                    //this.router.navigateByUrl("/login");
//                    break;
//                case 403:
//                    errorMessage =`forbidden`;
//                    //this.router.navigateByUrl("/unauthorized");
//                    break;
//                default:
//                    errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
//                    break;
//            }
//        }

//        this.toastr.error(errorMessage);
//        return throwError(errorMessage);

//      })
//    );
//  }
//}


//export class Envelope<T>{
//    result : T;
//    errorMessage :string;
//    timeGenerated: Date;
//}



////https://www.tektutorialshub.com/angular/angular-http-error-handling/
////https://www.positronx.io/angular-error-handling-tutorial-with-examples/
