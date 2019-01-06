import {of as observableOf, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CountryModel} from '../models/country.model';

@Injectable()
export class CountryService {
  private countries: CountryModel[] = [];
  private reloadRequired = true;

  constructor(private httpClient: HttpClient) {
  }

  public getCountries(noCache: boolean = false): Observable<CountryModel[]> {
    if (!noCache && !this.reloadRequired) {
      return observableOf(this.countries);
    }

    return this.httpClient.get<CountryModel[]>(`https://restcountries-v1.p.rapidapi.com/all`).pipe(
      tap(countries => {
        this.countries = countries;
        this.reloadRequired = false;
      }));
  }

  public getCountryByCode(alpha3Code: string, noCache: boolean = false): Observable<CountryModel> {
    if (!noCache) {
      const country: CountryModel = this.countries.find((c: CountryModel) => c.alpha3Code === alpha3Code);
      if (country) {
        return observableOf(country);
      }
    }

    return this.httpClient.get<CountryModel>(`https://restcountries-v1.p.rapidapi.com/alpha/${alpha3Code}`).pipe(
      tap(country => {
        this.countries.push(country);
        this.reloadRequired = true;
      }));
  }
}
