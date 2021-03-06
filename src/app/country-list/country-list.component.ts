import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';

import {CountryModel} from '../models/country.model';
import {CountryService} from '../services/country.service';
import {CountryDataSource} from './country-data-source';
import {CountryDatabase} from './country-database';

@Component({
  selector: 'miko-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  public countries: CountryModel[] = [];
  public dataSource: CountryDataSource | null;
  public countriesDatabase: CountryDatabase = new CountryDatabase(this.countryService);
  public displayedColumns = ['name', 'capital', 'region', 'area'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.dataSource = new CountryDataSource(this.countriesDatabase, this.paginator);
  }
}

