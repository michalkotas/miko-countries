import {async, inject, TestBed} from '@angular/core/testing';
import {Http, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {CurrencyService} from './currency.service';
import {SettingsService} from './settings.service';
import {SettingsServiceStub} from '../../testing/settings-stubs';
import {MOCK_CURRENCY} from '../../testing/currency-stubs';

describe('CurrencyService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CurrencyService,
        {provide: XHRBackend, useClass: MockBackend},
        {provide: SettingsService, useClass: SettingsServiceStub},
      ]
    }).compileComponents();
  }));

  it('should be created', inject([CurrencyService], (service: CurrencyService) => {
    expect(service).toBeTruthy();
  }));

  describe('service methods', () => {
    let backend: MockBackend;
    let service: CurrencyService;
    let settingsService: SettingsService;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, SettingsService], (http: Http,
                                                            be: MockBackend,
                                                            seService: SettingsService) => {
      backend = be;
      service = new CurrencyService(http, seService);
      settingsService = seService;
    }));

    it('getCurrencyRate should return fake data', async(inject([], () => {
      response = new Response(new ResponseOptions({
        status: 200,
        body: JSON.stringify(MOCK_CURRENCY)
      }));
      backend.connections.subscribe((c: MockConnection) => {
        return c.mockRespond(response);
      });

      service.getCurrencyRate('FAKE_CURRENCY')
        .subscribe(data => {
          expect(data).toEqual(MOCK_CURRENCY,
            'should have expected same mock data');
        });
    })));
  });
});
