import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DemoModeInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isDemo = localStorage.getItem('demoMode') === 'true';
    if (isDemo) {
      req = req.clone({ setHeaders: { 'X-Demo-Mode': 'true' } });
    }
    return next.handle(req);
  }
}
