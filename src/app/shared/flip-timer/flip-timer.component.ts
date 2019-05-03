import { Component, ViewEncapsulation } from '@angular/core';
import { ShareDataService } from './../../service/share/share-data.service';
import { Config } from 'ngx-countdown';

@Component({
  selector: 'app-flip-timer',
  templateUrl: './flip-timer.component.html',
  styleUrls: ['./flip-timer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlipTimerComponent {

  config: Config;
  duration: any;
  constructor(private share: ShareDataService) {
    this.share.currentDuration.subscribe((val) => {
      this.duration = val;
      this.configuration(this.duration);
    });
  }

  configuration(duration: number) {
    this.config = {
      leftTime: duration,
      repaint: function() {
        let me: any = this;
        let content: string;

        me.hands.forEach((hand: any) => {
          if (hand.lastValue !== hand.value) {
            content = '';
            let cur = me.toDigitals(hand.value + 1, hand.bits).join(''),
              next = me.toDigitals(hand.value, hand.bits).join('');

            hand.node.innerHTML = `
              <span class="count curr top">${cur}</span>
              <span class="count next top">${next}</span>
              <span class="count next bottom">${next}</span>
              <span class="count curr bottom">${cur}</span>
            `;
            hand.node.parentElement.className = 'time';
            setTimeout(() => {
              hand.node.parentElement.className = 'time flip';
            });
          }
        });
      },
    };
  }
}
