import { ShareDataService } from './../../../service/share/share-data.service';
import { LoadingController } from '@ionic/angular';
import { AdminService } from './../../../service/admin/admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  pend: number;
  auth: number;
  showData;
  polls = [];
  load: any;
  progress;
  private duration;
  days;
  hours;
  minutes;
  seconds;

  constructor(
    private router: Router,
    private admin: AdminService,
    private loadingCtrl: LoadingController,
    private share: ShareDataService
  ) {

  }

  ngOnInit() {
    this.loadInfo();
  }

  async loadInfo() {
    this.auth = 0;
    this.pend = 0;
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present().then(() => {
      this.admin.dashboard().then((val) => {
        // console.log(val);
        this.load = val;
        if (this.isEmpty(this.load.val)) {
          this.showData = false;
        } else {
          this.showData = true;
          this.polls = this.load.val;
        }
        const y = this.load.pending;
        if (this.isEmpty(y)) {
          this.pend = 0;
          // console.log('pending voters empty');
        } else {
          y.forEach((element) => {
            // console.log('element', element);
            this.pend += 1;
            // console.log('count', this.pend);
          });
        }
        const a = this.load.auth;
        if (this.isEmpty(a)) {
          this.auth = 0;
          // console.log('auth voters empty');
        } else {
          a.forEach(() => {
            this.auth += 1;
            // console.log('auth no', this.auth);
          });
        }
        if (this.showData !== false) {
          this.loader().then((b) => {
            let v: any;
            v = b;
            this.progress = v.options;
            // console.log('for progress bar: ', v);
            this.duration = v.duration;
            // console.log('duration', this.duration);
// tslint:disable-next-line: variable-name
            const poll_id = v.id;
            this.share.setId(poll_id);
            this.share.changeMessage(this.duration);
            this.checkDuration(this.duration);
            // console.log(this.progress);
          }).catch((e) => {
            // console.log(e);
          });
        }
        loader.dismiss();
      });
    }).catch((err) => {
      // console.log(err);
      loader.dismiss();
    });
  }

  loader() {
    return new Promise((resolve, reject) => {
      this.admin.currentRes().then((val) => {
        resolve(val);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }


  checkDuration(data) {
    const x = setInterval(() => {
      data--;
      if (data <= 1) {
        this.loadInfo();
        clearInterval(x);
      }
    }, 1000);
  }

  countDown(time: number) {
    const x = setInterval(function() {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(time / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((time % (1000 * 60)) / 1000);

      time--;
      // If the count down is finished, write some text
      if (time < 0) {
        clearInterval(x);
      }
    }, 1000);
  }
}
