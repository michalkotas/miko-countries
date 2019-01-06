import {CountryService} from '../services/country.service';
import {CountryModel} from '../models/country.model';
import {BehaviorSubject,  Subscription } from 'rxjs';

export class CountryDatabase {
  dataChange: BehaviorSubject<CountryModel[]> = new BehaviorSubject<CountryModel[]>([]);
  private getCountriesSubscription: Subscription;
  private _loaded: boolean;
  private _hasErrors: boolean;
  get data(): CountryModel[] {
    return this.dataChange.value;
  }
  get loaded(): boolean {
    return this._loaded;
  }

  get hasErrors(): boolean {
    return this._hasErrors;
  }

  unsubscribe(): void {
    if (this.getCountriesSubscription) {
      this.getCountriesSubscription.unsubscribe();
    }
  }

  constructor(private countryService: CountryService) {
    this.getCountriesSubscription = this.countryService.getCountries().subscribe((countries: CountryModel[]) => {
      this._loaded = true;
      this.dataChange.next(countries);
    }, () => this._hasErrors = true);
  }
}
