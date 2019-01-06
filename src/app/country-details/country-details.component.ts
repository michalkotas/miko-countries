
import {filter, mergeMap} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from '../services/currency.service';
import {Subscription, Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';


import {CountryService} from '../services/country.service';
import {CountryModel} from '../models/country.model';
import {CurrencyConvertModel} from '../models/currency-convert.model';

interface ConvertedCurrency {
  [currencyName: string]: { amount: number, error?: string };
}

@Component({
  selector: 'miko-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  public country: CountryModel;
  public convertedCurrency: ConvertedCurrency = {};
  private subscriptions: Subscription[] = [];

  constructor(private currencyService: CurrencyService,
              private countryService: CountryService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.pipe(mergeMap((params) => {
      if (params['alpha3Code']) {
        return this.countryService.getCountryByCode(decodeURIComponent(params['alpha3Code']));
      }
      return of(null);
    }), filter(country => !!country))
      .subscribe(country => {
        this.convertCurrency(country.currencies);
        this.country = country;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  convertCurrency(currencies: string[]): void {
    currencies.forEach((currencyName: string) => {
      this.subscriptions.push(this.currencyService.getCurrencyRate(currencyName).subscribe((cc: CurrencyConvertModel) =>
        this.convertedCurrency[currencyName] = {
          amount: cc.to_amount,
          error: cc.error,
        }, () => this.convertedCurrency[currencyName] = {
        amount: null,
        error: 'Error while loading currency rate',
      }));
    });
  }

}
