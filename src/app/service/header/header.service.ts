import { Injectable } from '@angular/core';
import { PollConfig } from './../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  protected api_url: string;
  protected key: string;

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {
    this.api_url = PollConfig.url.live;
  }

  protected getHeader(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Expose-Headers': 'true'
    });
  }
  protected getPostHeader(data: string): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application/json',
      'Access-Control-Expose-Headers': 'true',
      'x-auth': data
    });
  }

  protected requestHeader(data: string): HttpHeaders {
    return new HttpHeaders({
      'Access-Control-Expose-Headers': 'true',
      'x-auth': data
    });
  }

  protected adminAuth() {
    return new Promise((resolve, reject) => {
      this.storage.get('x-auth').then((val) => {
        resolve(val);
      }).catch((e) => reject(e));
    });
  }

  protected voterAuth() {
    return new Promise((resolve, reject) => {
      this.storage.get('vote-auth').then((val) => {
        resolve(val);
      }).catch((e) => reject(e));
    });
  }

}
