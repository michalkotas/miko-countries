import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsComponent} from './settings.component';
import {SettingsService} from '../services/settings.service';
import {SettingsServiceStub} from '../../testing/settings-stubs';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module';

describe('SettingsComponent', () => {
  let spySetMashapeKey: jasmine.Spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [
        SettingsComponent
      ],
      providers: [
        {provide: SettingsService, useClass: SettingsServiceStub},
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`form should be invalid, if 'mashapeKey' is empty`, fakeAsync(() => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const component = fixture.debugElement.componentInstance;
    tick();
    fixture.detectChanges();
    component.settingsForm.controls['mashapeKey'].setValue('');
    tick();
    fixture.detectChanges();
    expect(component.settingsForm.valid).toBeFalsy();
  }));

  it(`form should be valid, if 'mashapeKey' is provided`, fakeAsync(() => {
    const fixture = TestBed.createComponent(SettingsComponent);
    const settingsService = fixture.debugElement.injector.get(SettingsService);
    spySetMashapeKey = spyOn(settingsService, 'setMashapeKey').and.callThrough();
    const component = fixture.debugElement.componentInstance;
    tick();
    fixture.detectChanges();
    component.settingsForm.controls['mashapeKey'].setValue('VALUE');
    tick();
    fixture.detectChanges();
    component.submit(component.settingsForm);
    expect(spySetMashapeKey.calls.mostRecent().args[0]).toEqual('VALUE');
  }));
});
