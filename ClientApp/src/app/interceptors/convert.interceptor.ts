import { Injectable } from "@angular/core";
import {HttpEvent,HttpRequest,HttpHandler,HttpInterceptor,HttpResponse} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
//https://stackoverflow.com/questions/46019771/catching-errors-in-angular-httpclient
 //https://stackoverflow.com/questions/45566944/angular-4-3-httpclient-intercept-response
@Injectable()
export class ConvertInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {

        if (event instanceof HttpResponse && event.status == (200 || 201) ) {
          if(event.body && event.body.result)  {
            event = event.clone({ body: event.body.result })
          }
        }
        return event;
      })
    );
  }
}

