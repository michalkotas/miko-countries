import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const MOCK_MASHAPE_KEY = 'MOCK_MASHAPE_KEY';

@Injectable()
export class SettingsServiceStub {
  private mashapeKey: BehaviorSubject<string> = new BehaviorSubject<string>(MOCK_MASHAPE_KEY);

  constructor() { }

  public getMashapeKey(): string {
    return this.mashapeKey.getValue();
  }

  public getMashapeKeyAsync(): Observable<string> {
    return this.mashapeKey.asObservable();
  }

  public setMashapeKey(key: string): void {
    this.mashapeKey.next(key);
  }
}
