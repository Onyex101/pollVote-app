import { Injectable } from '@angular/core';
import { HeaderService } from './../header/header.service';

@Injectable({
  providedIn: 'root'
})
export class VoterService extends HeaderService {

  private token;
  private signup_url = `${this.api_url}/user/signup`;
  private login_url = `${this.api_url}/user/login`;
  private quiz = `${this.api_url}/user/get-code`;
  private vote = `${this.api_url}/user/poll`;
  private result = `${this.api_url}/user/results`;
  // private logout_url = `${this.api_url}/user/logout`;
  private reset = `${this.api_url}/user/forgot-password`;


  signup(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.signup_url, data, { headers: this.getHeader(), observe: 'response' })
        .subscribe((res) => {
          resolve(res.body);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.login_url, data, { headers: this.getHeader(), observe: 'response' })
        .subscribe((res) => {
          this.key = res['headers'].get('x-auth');
          this.storage.set('vote-auth', this.key).then((v) => {
            console.log('setItem', v);
          });
          resolve(res.body);
        }, (err) => {
          reject(err);
        });
    });
  }

  getQuiz(data) {
    return new Promise((resolve, reject) => {
      this.voterAuth().then((val) => {
        this.token = val;
        this.http.post(this.quiz, data, { headers: this.requestHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  sendVote(data) {
    return new Promise((resolve, reject) => {
      this.voterAuth().then((val) => {
        this.token = val;
        this.http.post(this.vote, data, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  getRes(data) {
    return new Promise((resolve, reject) => {
      this.voterAuth().then((val) => {
        this.token = val;
        this.http.post(this.result, data, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  resetPass(data) {
    return new Promise((resolve, reject) => {
      this.voterAuth().then((val) => {
        this.token = val;
        this.http.post(this.reset, data, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.voterAuth().then((val) => {
        this.token = val;
        this.http.delete(this.login_url, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

}
