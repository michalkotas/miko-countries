import {async, inject, TestBed} from '@angular/core/testing';
import {Http, HttpModule, Response, ResponseOptions, XHRBackend} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {CountryService} from './country.service';
import {SettingsService} from './settings.service';
import {SettingsServiceStub} from '../../testing/settings-stubs';
import {MOCK_COUNTRIES} from '../../testing/country-stubs';

describe('CountryService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        CountryService,
        {provide: XHRBackend, useClass: MockBackend},
        {provide: SettingsService, useClass: SettingsServiceStub},
      ]
    }).compileComponents();
  }));

  it('should be created', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));

  describe('service methods', () => {
    let backend: MockBackend;
    let service: CountryService;
    let settingsService: SettingsService;
    let response: Response;

    beforeEach(inject([Http, XHRBackend, SettingsService], (http: Http,
                                                            be: MockBackend,
                                                            seService: SettingsService) => {
      backend = be;
      service = new CountryService(http, seService);
      settingsService = seService;
    }));

    it('getCountries should return fake data', async(inject([], () => {
      response = new Response(new ResponseOptions({
        status: 200,
        body: JSON.stringify(MOCK_COUNTRIES)
      }));
      backend.connections.subscribe((c: MockConnection) => {
        return c.mockRespond(response);
      });

      service.getCountries()
        .subscribe(data => {
          expect(data).toEqual(MOCK_COUNTRIES,
            'should have expected same mock data');
        });
    })));

    it('getCountryByCode should return fake data', async(inject([], () => {
      response = new Response(new ResponseOptions({
        status: 200,
        body: JSON.stringify(MOCK_COUNTRIES[1])
      }));
      backend.connections.subscribe((c: MockConnection) => {
        return c.mockRespond(response);
      });

      service.getCountryByCode('CODE')
        .subscribe(data => {
          expect(data).toEqual(MOCK_COUNTRIES[1],
            'should have expected same mock data');
        });
    })));
  });
});
