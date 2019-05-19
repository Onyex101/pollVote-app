import { AdminService } from './../../../service/admin/admin.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ShareDataService } from './../../../service/share/share-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private payload;
  voted: any;
  notVoted: any;
  color: any;
  showList = true;
  constructor(
    private loadingCtrl: LoadingController,
    private share: ShareDataService,
    private admin: AdminService
  ) {
    this.payload = {
      id: this.share.getId()
    };
    this.color = {
      notVoted: 'light',
      voted: 'primary'
    };
  }

  ngOnInit() {
    this.voterStatus();
  }

  async voterStatus() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present().then(() => {
      this.admin.voteStatus(this.payload).then((res) => {
        // console.log(res);
        let a: any;
        a = res;
        this.voted = a.hasVoted;
        this.notVoted = a.notVoted;
        loader.dismiss();
      }).catch((err) => {
        // console.log(err);
        loader.dismiss();
      });
    });
  }

  setColor() {
    this.showList = !this.showList;
    if (this.showList === true) {
      this.color.notVoted = 'light';
      this.color.voted = 'primary';
    } else {
      this.color.notVoted = 'primary';
      this.color.voted = 'light';
    }
  }
}
