import { ShareDataService } from './../share/share-data.service';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  private channel;
  constructor(
    private share: ShareDataService
  ) {
    const code = this.share.getCode();
    const pusher = new Pusher('b2c8f549b923bdb99172', {
      cluster: 'eu'
    });
    this.channel = pusher.subscribe(code);
  }

  init() {
    return this.channel;
  }
}
