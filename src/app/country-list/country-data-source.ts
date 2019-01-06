import {DataSource} from '@angular/cdk/collections';
import {CountryDatabase} from './country-database';
import {MdPaginator} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {CountryModel} from '../models/country.model';

export class CountryDataSource extends DataSource<any> {
  constructor(private CountryDatabase: CountryDatabase, private paginator: MdPaginator) {
    super();
  }

  connect(): Observable<CountryModel[]> {
    const displayDataChanges = [
      this.CountryDatabase.dataChange,
      this.paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.CountryDatabase.data.slice();
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    });
  }

  disconnect() {
    this.CountryDatabase.unsubscribe();
  }
}
