
import {merge as observableMerge, Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {DataSource} from '@angular/cdk/collections';
import {CountryDatabase} from './country-database';
import {MatPaginator} from '@angular/material';
import {CountryModel} from '../models/country.model';

export class CountryDataSource extends DataSource<any> {
  constructor(private CountryDatabase: CountryDatabase, private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<CountryModel[]> {
    const displayDataChanges = [
      this.CountryDatabase.dataChange,
      this.paginator.page,
    ];

    return observableMerge(...displayDataChanges).pipe(map(() => {
      const data = this.CountryDatabase.data.slice();
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    }));
  }

  disconnect() {
    this.CountryDatabase.unsubscribe();
  }
}
