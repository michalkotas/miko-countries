
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';


import {SettingsService} from './settings.service';
import {CurrencyConvertModel} from '../models/currency-convert.model';

@Injectable()
export class CurrencyService {
  constructor(private http: Http, private settingsService: SettingsService) {
  }

  public getCurrencyRate(to: string, from: string = 'PLN', from_amount: number = 1): Observable<CurrencyConvertModel> {
    const headers = new Headers();
    const search: URLSearchParams = new URLSearchParams();
    search.set('to', to.toString());
    search.set('from', from.toString());
    search.set('from_amount', from_amount.toString());
    headers.append('X-Mashape-Key', this.settingsService.getMashapeKey());

    return this.http.get(`https://currencyconverter.p.mashape.com`, {search, headers}).pipe(map(res => {
      return new CurrencyConvertModel(res.json());
    }));
  }

}
