import { Injectable } from '@angular/core';
import { HeaderService } from './../header/header.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends HeaderService {

  private token;

  private home_url = `${this.api_url}/admin/home`;
  private signup_url = `${this.api_url}/admin/signup`;
  private login_url = `${this.api_url}/admin/login`;
  private newPoll = `${this.api_url}/admin/new-poll`;
  private allpolls = `${this.api_url}/admin/all-polls`;
  private deletePoll = `${this.api_url}/admin/delete/`;
  private pend_url = `${this.api_url}/admin/pending`;
  private auth_url = `${this.api_url}/admin/pend-auth`;
  private confirm_url = `${this.api_url}/admin/authorised`;
  private status_url = `${this.api_url}/admin/lists`;
  private current_res = `${this.api_url}/admin/results`;
  private forgot_url = `${this.api_url}/admin/forgot-password`;
  private logout_url = `${this.api_url}/admin/logout`;
  private arch_url = `${this.api_url}/admin/archive`;

  signup(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.signup_url, data, { headers: this.getHeader(), observe: 'response' })
        .subscribe((res) => {
          this.key = res['headers'].get('x-auth');
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
          this.storage.set('x-auth', this.key).then((v) => {
            console.log('setItem', v);
          });
          resolve(res.body);
        }, (err) => {
          reject(err);
        });
    });
  }


  dashboard() {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.get(this.home_url, { headers: this.requestHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }


  createPPoll(data) {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.post(this.newPoll, data, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  allPolls() {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.get(this.allpolls, { headers: this.requestHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            console.log(this.key);
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  delete(data) {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.delete(this.deletePoll + data, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  pending() {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.get(this.pend_url, { headers: this.requestHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  pendAuth(data) {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.post(this.auth_url, data, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  authorized() {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.get(this.confirm_url, { headers: this.requestHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  currentRes() {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.get(this.current_res, { headers: this.requestHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  passwordReset(data) {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.post(this.forgot_url, data, { headers: this.getPostHeader(this.token), observe: 'response' })
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
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.delete(this.logout_url, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }

  archives() {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.get(this.arch_url, { headers: this.requestHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }


  voteStatus(data) {
    return new Promise((resolve, reject) => {
      this.adminAuth().then((val) => {
        this.token = val;
        this.http.post(this.status_url, data, { headers: this.getPostHeader(this.token), observe: 'response' })
          .subscribe((res) => {
            resolve(res.body);
          }, (err) => {
            reject(err);
          });
      });
    });
  }
}
