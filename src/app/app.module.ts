import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from './../pages/login/login';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';



firebase.initializeApp({
      apiKey: "AIzaSyDxrtNC4K-DOgIkyTbPmg2E3cy2CqgPqek",
    authDomain: "noffila-e7c4e.firebaseapp.com",
    databaseURL: "https://noffila-e7c4e.firebaseio.com",
    storageBucket: "noffila-e7c4e.appspot.com",
    messagingSenderId: "916763705532"
  });

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
