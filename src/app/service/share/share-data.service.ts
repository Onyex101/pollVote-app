import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private code: any;
  private id: any;
  private timeSource = new BehaviorSubject(0);
  currentDuration = this.timeSource.asObservable();

  constructor() { }

  setCode(data: string): void {
    this.code = data;
  }

  getCode(): string {
    return this.code;
  }

  changeMessage(duration: number) {
    this.timeSource.next(duration);
  }

  setId(data: any) {
    this.id = data;
  }

  getId(): any {
    return this.id;
  }
}
