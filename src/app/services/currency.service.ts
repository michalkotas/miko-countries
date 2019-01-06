import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CurrencyConvertModel} from '../models/currency-convert.model';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class CurrencyService {
  constructor(private httpClient: HttpClient) {
  }

  public getCurrencyRate(to: string, from: string = 'PLN', from_amount: number = 1): Observable<CurrencyConvertModel> {
    let params = new HttpParams();
    params = params.append('to', to.toString());
    params = params.append('from', from.toString());
    params = params.append('from_amount', from_amount.toString());

    return this.httpClient.get<CurrencyConvertModel>(`https://currencyconverter.p.rapidapi.com`, {params});
  }

}
