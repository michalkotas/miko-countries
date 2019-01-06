import {async, inject, TestBed} from '@angular/core/testing';
import {CountryService} from './country.service';
import {MOCK_COUNTRIES} from '../../testing/country-stubs';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('CountryService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        CountryService,
      ]
    }).compileComponents();
  }));

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));

  it('getCountries should return fake data', async(inject([CountryService, HttpTestingController],
    (service: CountryService, backend: HttpTestingController) => {
      service.getCountries().subscribe((data) => {
        expect(data).toEqual(MOCK_COUNTRIES,
          'should have expected same mock data');
      });

      backend.expectOne(`https://restcountries-v1.p.rapidapi.com/all`).flush(MOCK_COUNTRIES, {
        status: 200,
        statusText: 'Ok'
      });
    })));

  it('getCountryByCode should return fake data', async(inject([CountryService, HttpTestingController],
    (service: CountryService, backend: HttpTestingController) => {
      service.getCountryByCode('CODE').subscribe((data) => {
        expect(data).toEqual(MOCK_COUNTRIES[1],
                  'should have expected same mock data');
      });

      backend.expectOne(`https://restcountries-v1.p.rapidapi.com/alpha/CODE`).flush(MOCK_COUNTRIES[1], {
        status: 200,
        statusText: 'Ok'
      });
    })));
});
