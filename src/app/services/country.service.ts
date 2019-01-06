
import {of as observableOf, Observable} from 'rxjs';

import {map, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';


import {CountryModel} from '../models/country.model';
import {SettingsService} from './settings.service';

@Injectable()
export class CountryService {
  private countries: CountryModel[] = [];
  private reloadRequired = true;

  constructor(private http: Http, private settingsService: SettingsService) {
  }

  public getCountries(noCache: boolean = false): Observable<CountryModel[]> {
    if (!noCache && !this.reloadRequired) {
      return observableOf(this.countries);
    }

    const headers = new Headers();
    headers.append('X-Mashape-Key', this.settingsService.getMashapeKey());
    return this.http.get(`https://restcountries-v1.p.mashape.com/all`, {headers}).pipe(
      map(res => res.json().map(country => new CountryModel(country))),
      tap(countries => {
        this.countries = countries;
        this.reloadRequired = false;
      }),);
  }

  public getCountryByCode(alpha3Code: string, noCache: boolean = false): Observable<CountryModel> {
    if (!noCache) {
      const country: CountryModel = this.countries.find((c: CountryModel) => c.alpha3Code === alpha3Code);
      if (country) {
        return observableOf(country);
      }
    }

    const headers = new Headers();
    headers.append('X-Mashape-Key', this.settingsService.getMashapeKey());
    return this.http.get(`https://restcountries-v1.p.mashape.com/alpha/${alpha3Code}`, {headers}).pipe(
      map(res => new CountryModel(res.json())),
      tap(country => {
        this.countries.push(country);
        this.reloadRequired = true;
      }),);
  }
}
