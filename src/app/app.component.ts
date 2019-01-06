import {Component} from '@angular/core';
import {SettingsService} from './services/settings.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'miko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public mashapeKey: Observable<string>;

  constructor(private settingsService: SettingsService) {
    this.mashapeKey = this.settingsService.getMashapeKeyAsync();
  }
}
