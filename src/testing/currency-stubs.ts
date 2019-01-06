import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CurrencyConvertModel} from '../app/models/currency-convert.model';

export const MOCK_CURRENCY: CurrencyConvertModel = new CurrencyConvertModel({
  'from': 'FAKE_FROM',
  'to': 'FAKE_TO',
  'from_amount': 1,
  'to_amount': 3.14
});

@Injectable()
export class CurrencyServiceStub {
  public getCurrencyRate(to: string, from: string = 'FAKE_FROM', from_amount: number = 1): Observable<CurrencyConvertModel> {
    return of(MOCK_CURRENCY);
  }
}
