import { Component } from '@angular/core';
import { WebIntent, IntentOptions } from '@ionic-native/web-intent/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private webIntent: WebIntent) {}

  callBrowserWebIntent() {
    const options: IntentOptions ={
      action: this.webIntent.ACTION_VIEW,
      url: 'http://www.google.com'
    };

    this.webIntent.startActivity(options).then(
      intent => { console.log('Web Intent was successful', intent); },
      error => {console.log('Error, Web Intent failed', error.message);}
    );
  }

  callNativeAppWebIntent() {
    const options: IntentOptions = {
      action: this.webIntent.ACTION_VIEW,
      package: 'com.google.android.apps.maps'
    };

    this.webIntent.startActivity(options).then(
      intent => { console.log('Web Intent was successful', intent); },
      error => {console.log('Error, Web Intent failed', error);}
    );
  }

  callCustomAppIntent() {
    const options: IntentOptions = {
      component: {
        package:'com.gameplay.app1',
        class: 'com.gameplay.app1.MainActivity'
      },
      extras: {
        launchingAppPackage:'io.ionic.starter',
        launchingAppClass: 'io.ionic.starter.MainActivity'
      }
    };

    this.webIntent.startActivity(options).then(
      intent => { console.log('Web Intent was successful', intent); },
      error => {console.log('Error, Web Intent failed', error);}
    );
  }
}
