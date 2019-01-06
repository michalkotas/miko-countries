import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
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
      return Observable.of(this.countries);
    }

    const headers = new Headers();
    headers.append('X-Mashape-Key', this.settingsService.getMashapeKey());
    return this.http.get(`https://restcountries-v1.p.mashape.com/all`, {headers})
      .map(res => res.json().map(country => new CountryModel(country)))
      .do(countries => {
        this.countries = countries;
        this.reloadRequired = false;
      });
  }

  public getCountryByCode(alpha3Code: string, noCache: boolean = false): Observable<CountryModel> {
    if (!noCache) {
      const country: CountryModel = this.countries.find((c: CountryModel) => c.alpha3Code === alpha3Code);
      if (country) {
        return Observable.of(country);
      }
    }

    const headers = new Headers();
    headers.append('X-Mashape-Key', this.settingsService.getMashapeKey());
    return this.http.get(`https://restcountries-v1.p.mashape.com/alpha/${alpha3Code}`, {headers})
      .map(res => new CountryModel(res.json()))
      .do(country => {
        this.countries.push(country);
        this.reloadRequired = true;
      });
  }
}
