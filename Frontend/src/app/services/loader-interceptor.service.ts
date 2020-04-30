import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterComponent } from '../toaster/toaster.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(
    private spinner : NgxSpinnerService,
    private toaster:ToasterComponent) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.spinner.show();
    return next.handle(
      req.clone({
        setHeaders: {        
          'Content-Type':'application/json'
        }
    })
      ).pipe(tap((event: HttpEvent<any>) => { 
      if (event instanceof HttpResponse) {
        this.spinner.hide();
      }
    },err => this.spinner.hide()));
  }
  // private onEnd(): void {
  //   this.hideLoader();
  // }
  // private showLoader(): void {
  //   this.loaderService.show();
  // }
  // private hideLoader(): void {
  //   this.loaderService.hide();
  // }
}