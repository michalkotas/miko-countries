import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {CountryModel} from '../app/models/country.model';

export const MOCK_COUNTRIES: CountryModel[] = [
  new CountryModel({
    'name': 'Armenia',
    'topLevelDomain': [
      '.am'
    ],
    'alpha2Code': 'AM',
    'alpha3Code': 'ARM',
    'callingCodes': [
      '374'
    ],
    'capital': 'Yerevan',
    'altSpellings': [
      'AM',
      'Hayastan',
      'Republic of Armenia',
      'Հայաստանի Հանրապետություն'
    ],
    'relevance': '0',
    'region': 'Asia',
    'subregion': 'Western Asia',
    'population': 3006800,
    'latlng': [
      40.0,
      45.0
    ],
    'demonym': 'Armenian',
    'area': 29743.0,
    'gini': 30.9,
    'timezones': [
      'UTC+04:00'
    ],
    'borders': [
      'AZE',
      'GEO',
      'IRN',
      'TUR'
    ],
    'nativeName': 'Հայաստան',
    'numericCode': '051',
    'currencies': [
      'AMD'
    ],
    'languages': [
      'hy',
      'ru'
    ],
    'translations': {
      'de': 'Armenien',
      'es': 'Armenia',
      'fr': 'Arménie',
      'ja': 'アルメニア',
      'it': 'Armenia'
    }
  }),
  new CountryModel({
    'name': 'Aruba',
    'topLevelDomain': [
      '.aw'
    ],
    'alpha2Code': 'AW',
    'alpha3Code': 'ABW',
    'callingCodes': [
      '297'
    ],
    'capital': 'Oranjestad',
    'altSpellings': [
      'AW'
    ],
    'relevance': '0.5',
    'region': 'Americas',
    'subregion': 'Caribbean',
    'population': 107394,
    'latlng': [
      12.5,
      -69.96666666
    ],
    'demonym': 'Aruban',
    'area': 180.0,
    'gini': null,
    'timezones': [
      'UTC-04:00'
    ],
    'borders': [],
    'nativeName': 'Aruba',
    'numericCode': '533',
    'currencies': [
      'AWG'
    ],
    'languages': [
      'nl',
      'pa'
    ],
    'translations': {
      'de': 'Aruba',
      'es': 'Aruba',
      'fr': 'Aruba',
      'ja': 'アルバ',
      'it': 'Aruba'
    }
  }),
  new CountryModel({
    'name': 'Australia',
    'topLevelDomain': [
      '.au'
    ],
    'alpha2Code': 'AU',
    'alpha3Code': 'AUS',
    'callingCodes': [
      '61'
    ],
    'capital': 'Canberra',
    'altSpellings': [
      'AU'
    ],
    'relevance': '1.5',
    'region': 'Oceania',
    'subregion': 'Australia and New Zealand',
    'population': 23868800,
    'latlng': [
      -27.0,
      133.0
    ],
    'demonym': 'Australian',
    'area': 7692024.0,
    'gini': 30.5,
    'timezones': [
      'UTC+05:00',
      'UTC+06:30',
      'UTC+07:00',
      'UTC+08:00',
      'UTC+09:30',
      'UTC+10:00',
      'UTC+10:30',
      'UTC+11:30'
    ],
    'borders': [],
    'nativeName': 'Australia',
    'numericCode': '036',
    'currencies': [
      'AUD'
    ],
    'languages': [
      'en'
    ],
    'translations': {
      'de': 'Australien',
      'es': 'Australia',
      'fr': 'Australie',
      'ja': 'オーストラリア',
      'it': 'Australia'
    }
  }),
  new CountryModel({
    'name': 'Austria',
    'topLevelDomain': [
      '.at'
    ],
    'alpha2Code': 'AT',
    'alpha3Code': 'AUT',
    'callingCodes': [
      '43'
    ],
    'capital': 'Vienna',
    'altSpellings': [
      'AT',
      'Österreich',
      'Osterreich',
      'Oesterreich'
    ],
    'relevance': '0',
    'region': 'Europe',
    'subregion': 'Western Europe',
    'population': 8602112,
    'latlng': [
      47.33333333,
      13.33333333
    ],
    'demonym': 'Austrian',
    'area': 83871.0,
    'gini': 26.0,
    'timezones': [
      'UTC+01:00'
    ],
    'borders': [
      'CZE',
      'DEU',
      'HUN',
      'ITA',
      'LIE',
      'SVK',
      'SVN',
      'CHE'
    ],
    'nativeName': 'Österreich',
    'numericCode': '040',
    'currencies': [
      'EUR'
    ],
    'languages': [
      'de'
    ],
    'translations': {
      'de': 'Österreich',
      'es': 'Austria',
      'fr': 'Autriche',
      'ja': 'オーストリア',
      'it': 'Austria'
    }
  }),
];


@Injectable()
export class CountryServiceStub {
  public getCountries(noCache: boolean = false): Observable<CountryModel[]> {
    return of(MOCK_COUNTRIES.slice());
  }

  public getCountryByCode(alpha3Code: string, noCache: boolean = false): Observable<CountryModel> {
    const country: CountryModel = MOCK_COUNTRIES.slice().find((c: CountryModel) => c.alpha3Code === alpha3Code);
    if (country) {
      return of(country);
    }
  }
}
