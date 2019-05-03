import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Router } from '@angular/router';
import { FcmService } from './service/fcm/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController,
    // private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }


  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        if (this.platform.is('ios')) {

        } else {

        }
      });
  }
}
