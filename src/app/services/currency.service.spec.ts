import {async, inject, TestBed} from '@angular/core/testing';
import {CurrencyService} from './currency.service';
import {MOCK_CURRENCY} from '../../testing/currency-stubs';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CurrencyService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        CurrencyService,
      ]
    }).compileComponents();
  }));

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([CurrencyService], (service: CurrencyService) => {
    expect(service).toBeTruthy();
  }));

  it('getCurrencyRate should return fake data', async(inject([CurrencyService, HttpTestingController],
    (service: CurrencyService, backend: HttpTestingController) => {
      service.getCurrencyRate('FAKE_CURRENCY').subscribe((data) => {
        expect(data).toEqual(MOCK_CURRENCY);
      });

      backend.expectOne(`https://currencyconverter.p.rapidapi.com?to=FAKE_CURRENCY&from=PLN&from_amount=1`).flush(MOCK_CURRENCY, {
        status: 200,
        statusText: 'Ok'
      });
    })));
});
