import { LoadingController } from '@ionic/angular';
import { AdminService } from './../../../service/admin/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.page.html',
  styleUrls: ['./pending.page.scss'],
})
export class PendingPage implements OnInit {

  pendingUsers: any = [];
  pendSelected: any = [];
  toggle = false;
  loadInfo = false;
  iconColor;
  constructor(
    private admin: AdminService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present();
    this.loadData().then(() => {
      loader.dismiss();
    }).catch(e => {
      loader.dismiss();
    });
  }

  loadData() {
    return new Promise((resolve, reject) => {
      this.admin.pending().then((res) => {
        this.pendingUsers = res;
        this.pendingUsers.forEach((val) => {
          val['isChecked'] = false;
        });
        if (this.isEmpty(this.pendingUsers)) {
          this.loadInfo = false;
        } else {
          this.loadInfo = true;
        }
        console.log(this.pendingUsers);
        resolve();
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
  }

  authorise() {
    this.pendSelected = [];
    console.log(this.pendingUsers);
    this.pendingUsers.forEach((val) => {
      if (val.isChecked === true) {
        this.pendSelected.push(val);
      }
    });
    const payload = { pending: this.pendSelected };
    console.log('payload:', payload);
    this.admin.pendAuth(payload).then((val) => {
      console.log(val);
      this.loadData();
    }).catch((err) => {
      console.log(err);
      this.loadData();
    });
  }

  selectAll() {
    this.toggle = !this.toggle;
    console.log(this.toggle);
    if (this.toggle === true) {
      this.pendingUsers.forEach((element) => {
        element.isChecked = true;
        this.iconColor = true;
      });
    } else {
      this.pendingUsers.forEach((element) => {
        element.isChecked = false;
        this.iconColor = false;
      });
    }
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
