import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { CountdownModule } from 'ngx-countdown';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'angular-progress-bar';
// Components
import { AppComponent } from './app.component';
// Services
import { ShareDataService } from './service/share/share-data.service';
import { AuthService } from './service/auth/auth.service';
import { PusherService } from './service/pusher/pusher.service';
import { HeaderService } from './service/header/header.service';
import { VoterService } from './service/voter/voter.service';
import { AdminService } from './service/admin/admin.service';
import { FcmService } from './service/fcm/fcm.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';

const config = {
  apiKey: 'AIzaSyDyDZ3G-W4--6N14E1-7gUfEVjmMqwaUkk',
  authDomain: 'pollvote-f81c0.firebaseapp.com',
  databaseURL: 'https://pollvote-f81c0.firebaseio.com',
  projectId: 'pollvote-f81c0',
  storageBucket: 'pollvote-f81c0.appspot.com',
  messagingSenderId: '760497764786'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    HttpClientModule,
    ProgressBarModule,
    AppRoutingModule,
    CountdownModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FcmService,
    AdminService,
    VoterService,
    HeaderService,
    PusherService,
    AuthService,
    ShareDataService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
