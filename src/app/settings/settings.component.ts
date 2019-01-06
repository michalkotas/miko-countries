import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'miko-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public settingsForm: FormGroup;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    const currentMashapeKey: string = this.settingsService.getMashapeKey();
    this.settingsForm = new FormGroup({
      mashapeKey: new FormControl(currentMashapeKey ? currentMashapeKey : '', Validators.required),
    });
  }

  submit(form: FormGroup): void {
    if (form.valid) {
      this.settingsService.setMashapeKey(form.value.mashapeKey);
    }
  }
}

