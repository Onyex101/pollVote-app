import { LoadingController } from '@ionic/angular';
import { AdminService } from './../../../service/admin/admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorised',
  templateUrl: './authorised.page.html',
  styleUrls: ['./authorised.page.scss'],
})
export class AuthorisedPage implements OnInit {

  authUsers: any = [];
  loadInfo = false;

  constructor(
    private router: Router,
    private admin: AdminService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      spinner: 'bubbles',
      showBackdrop: true
    });
    loader.present();
    this.admin.authorized().then((val) => {
      // console.log(val);
      this.authUsers = val;
      if (this.isEmpty(this.authUsers)) {
        this.loadInfo = false;
      } else {
        this.loadInfo = true;
      }
      loader.dismiss();
    }).catch((e) => {
      // console.log(e);
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

}
