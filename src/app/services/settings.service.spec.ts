import {TestBed, inject, async} from '@angular/core/testing';
import {SettingsService} from './settings.service';

describe('SettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingsService]
    });
  });

  it('should be created', inject([SettingsService], (service: SettingsService) => {
    expect(service).toBeTruthy();
  }));

  describe('service methods', () => {
    it('getMashapeKey should return initial value', inject([SettingsService], (service: SettingsService) => {
      expect(service.getMashapeKey()).toEqual('fD73ZH1OTcmshMusCaJiCQACUTPXp1IfFdrjsnSbDpVKxuMZMD');
    }));

    it('getMashapeKeyAsync should return initial value', async(inject([SettingsService], (service: SettingsService) => {
      service.setMashapeKey('FAKE_KEY');
      service.getMashapeKeyAsync()
        .subscribe(data => {
          expect(data).toEqual('FAKE_KEY',
            'should return same value');
        });
    })));
  });
});
