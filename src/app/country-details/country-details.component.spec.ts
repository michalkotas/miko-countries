import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {
  MdButtonModule, MdListModule, MdChipsModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CountryService} from '../services/country.service';
import {CountryServiceStub, MOCK_COUNTRIES} from '../../testing/country-stubs';
import {CurrencyServiceStub, MOCK_CURRENCY} from '../../testing/currency-stubs';
import {CountryDetailsComponent} from './country-details.component';
import {CurrencyService} from '../services/currency.service';
import {ActivatedRouteStub} from '../../testing/router-stubs';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;
  let activatedRoute: ActivatedRouteStub;


  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{
        path: 'country/:alpha3Code',
        component: CountryDetailsComponent
      }]), NoopAnimationsModule, MdButtonModule, MdListModule, MdChipsModule],
      declarations: [CountryDetailsComponent],
      providers: [
        {provide: CountryService, useClass: CountryServiceStub},
        {provide: CurrencyService, useClass: CurrencyServiceStub},
        {provide: ActivatedRoute, useValue: activatedRoute},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.testParams = {alpha3Code: 'ABW'};
    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper country data', () => {
    expect(component.country).toEqual(MOCK_COUNTRIES.find(country => country.alpha3Code === 'ABW'));
  });

  it(`'convertCurrency' should fill 'convertedCurrency `, fakeAsync(() => {
    const country = MOCK_COUNTRIES.find(c => c.alpha3Code === 'AUS');
    component.convertCurrency(country.currencies);
    tick();
    expect(component.convertedCurrency['AUD']).toEqual({amount: MOCK_CURRENCY.to_amount, error: undefined});
  }));

  it('Card title should be set to country name', async(() => {
    const country = MOCK_COUNTRIES.find(c => c.alpha3Code === 'ABW');
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-card-title').textContent).toContain(country.name);
  }));
});
