import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class Login {
    
  userProfile: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private facebook: Facebook,) {
  }
  facebookLogin(): void {
    if (this.platform.is('cordova')) {
      this.facebook.login(['email']).then((response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
          })
          .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
          });

      }).catch((error) => { console.log(error) });
    }
    else{
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then((r)=>{
        console.log(r.user.displayName);
        this.navCtrl.setRoot(HomePage, r.user.email
        );
      })

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
