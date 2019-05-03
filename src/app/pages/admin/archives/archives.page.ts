import { LoadingController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './../../../service/admin/admin.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.page.html',
  styleUrls: ['./archives.page.scss'],
})
export class ArchivesPage implements OnInit {

  load: any;
  automaticClose = false;
  color: any;
  showList = true;
  constructor(
    private admin: AdminService,
    private loadingCtrl: LoadingController
  ) {
    this.loadInfo();
    this.color = {
      notVoted: 'light',
      voted: 'primary'
    };
  }

  ngOnInit() {
  }

  async loadInfo() {
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present().then(() => {
      this.admin.archives().then((val) => {
        let a: any;
        a = val;
        this.load = a.archive;
        this.load[0].open = true;
        console.log('archive', this.load);
      }).catch((e) => {
        console.log(e);
      });
      loader.dismiss();
    });
  }

  toggleSection(index) {
    this.load[index].open = !this.load[index].open;
    if (this.automaticClose && this.load[index].open) {
      this.load[index].open = false;
    }
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
