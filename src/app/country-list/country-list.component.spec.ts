import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement} from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CountryListComponent } from './country-list.component';
import {SettingsService} from '../services/settings.service';
import {SettingsServiceStub} from '../../testing/settings-stubs';
import {CountryService} from '../services/country.service';
import {CountryServiceStub, MOCK_COUNTRIES} from '../../testing/country-stubs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import {MaterialModule} from '../material-module';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, NoopAnimationsModule],
      declarations: [ CountryListComponent ],
      providers: [
        {provide: SettingsService, useClass: SettingsServiceStub},
        {provide: CountryService, useClass: CountryServiceStub},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('dataSource should be initialized', () => {
    expect(component.dataSource).toBeTruthy();
  });

  it('countriesDatabase should have data', () => {
    expect(component.countriesDatabase.data).toEqual(MOCK_COUNTRIES);
  });

  it('number of rows should match data length', () => {
    const rows: DebugElement[] = fixture.debugElement.queryAll(By.css('mat-row'));
    expect(rows.length).toEqual(component.countriesDatabase.data.length);
  });
});
