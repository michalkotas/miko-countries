import {BaseModel} from './base.model';

export class CountryModel extends BaseModel {
  name: string;
  capital: string;
  altSpellings: string[];
  relevance: number;
  region: string;
  subregion: string;
  translations: {[countryCode: string]: string};
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  callingCodes: number[];
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  currencies: string[];
  languages: string[];
  numericCode: number;
  borders: string[];
  nativeName: string;

  constructor(data?) {
    super(data);
  }
}
