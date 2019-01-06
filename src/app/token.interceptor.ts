import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SettingsService} from './services/settings.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private settingsService: SettingsService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'X-RapidAPI-Key': this.settingsService.getMashapeKey()
      }
    });

    return next.handle(request);
  }
}
