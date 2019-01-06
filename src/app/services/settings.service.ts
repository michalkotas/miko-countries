import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class SettingsService {
  private mashapeKey: BehaviorSubject<string> = new BehaviorSubject<string>('ioqz3WNS9Bmsh0j7xffM9NZfRQcEp1pCgSLjsnuvr5M7nAAH4E');

  constructor() {
  }

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
