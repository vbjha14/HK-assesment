import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, delay } from "rxjs/operators";
import { LoaderService } from '../spinner-overlay/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const loaderService = this.injector.get(LoaderService);

    loaderService.show('Please wait...');

    return next.handle(req).pipe(
      //delay(1000),
      finalize(() => loaderService.hide())
    );
  }
}
