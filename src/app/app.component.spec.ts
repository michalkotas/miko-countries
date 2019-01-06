import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SettingsServiceStub} from '../testing/settings-stubs';
import {SettingsService} from './services/settings.service';
import {MaterialModule} from './material-module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: SettingsService, useClass: SettingsServiceStub},
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('MiKo Countries');
  }));

  it(`should have mashapeKey set to 'MOCK_MASHAPE_KEY' `, fakeAsync(() => {
    let mashapeKey: string;
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    component.mashapeKey.subscribe(key => mashapeKey = key);
    tick();
    fixture.detectChanges();
    expect(mashapeKey).toBe('MOCK_MASHAPE_KEY');
  }));

  it(`Menu should contain 'Countries' link`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElements = fixture.debugElement.queryAll(By.css('a'));
    const country: DebugElement = debugElements.find(de => de.nativeElement.innerText.trim() === 'Countries');
    fixture.detectChanges();
    expect(country).toBeTruthy();
  }));
});
