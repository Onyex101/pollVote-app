import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareDataService } from './../../../service/share/share-data.service';
import { PusherService } from './../../../service/pusher/pusher.service';
import { LoadingController } from '@ionic/angular';
import { VoterService } from './../../../service/voter/voter.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.page.html',
  styleUrls: ['./vote.page.scss'],
})
export class VotePage implements OnInit {

  private vote;
  initialComp = true;
  didLoad = false;
  quiz: any;
  data: any;
  title;
  result;
  pushNot: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private voter: VoterService,
    private loadingCtrl: LoadingController,
    private pusher: PusherService,
    private share: ShareDataService
  ) {
    this.data = {
      code: this.share.getCode()
    };
    // this.pushNot = this.route.snapshot.params['price'];
    console.log('code', this.data);
  }

  async ngOnInit() {
    this.loadPusher();
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present().then(() => {
      this.voter.getQuiz(this.data).then((val) => {
        let b: any;
        b = val;
        this.quiz = val;
        console.log(this.quiz);
        if (b.message === 'Already Voted!') {
          this.progressBar().then((v) => {
            let n: any;
            n = v;
            this.result = n.options;
            this.title = n.title;
            this.didLoad = false;
            this.initialComp = false;
            console.log(n);
          }).catch((e) => {
            console.log(e);
          });
        } else {
          this.quiz.options.forEach((elment) => {
            elment['isChecked'] = false;
          });
          this.didLoad = true;
          console.log(this.quiz);
        }
      }).catch((e) => {
        console.log(e);
      });
      loader.dismiss();
    });
  }


  async sendPoll(id) {
    this.vote = {};
    this.vote._id = id;
    this.vote.code = this.data.code;
    console.log(this.vote);
    const loader = await this.loadingCtrl.create({
      showBackdrop: true,
      spinner: 'bubbles'
    });
    loader.present().then(() => {
      this.voter.sendVote(this.vote).then((val) => {
        console.log(val);
        this.progressBar().then((v) => {
          let a: any;
          a = v;
          this.title = a.title;
          this.result = a.options;
          this.didLoad = false;
          this.initialComp = false;
          console.log(this.result);
        });
      }).catch((err) => {
        this.didLoad = false;
        this.initialComp = false;
        console.log(err);
      });
      loader.dismiss();
    });
  }

  loadPusher() {
    console.log('page loaded');
    const channel = this.pusher.init();
    channel.bind('new-entry', (data) => {
      console.log('pusher info', data);
      let a: any;
      a = data;
      this.title = a.title;
      this.result = a.options;
    });
  }

  progressBar() {
    return new Promise((resolve, reject) => {
      this.voter.getRes(this.data).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  back() {
    this.router.navigateByUrl('/login');
  }
}
