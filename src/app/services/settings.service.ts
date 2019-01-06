import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SettingsService {
  private mashapeKey: BehaviorSubject<string> = new BehaviorSubject<string>('fD73ZH1OTcmshMusCaJiCQACUTPXp1IfFdrjsnSbDpVKxuMZMD');

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
