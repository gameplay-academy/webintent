import { Component, OnInit } from '@angular/core';
import { IntentOptions, WebIntent } from '@ionic-native/web-intent/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  intentData = 'Something';

  constructor(
    private webIntent: WebIntent,
    private platform: Platform) {}

  ngOnInit(): void {
    console.log('NgOnInit App1');
    this.getIntentData();
  }

  navigateToApp() {
    console.log('Going to App #1');

    const options: IntentOptions = {
      component: {
        package:'com.gameplay.app2',
        class: 'com.gameplay.app2.MainActivity'
      },
      extras: {
        launchingApplication: 'com.gameplay.app1',
        launchingClass: 'com.gameplay.app1.MainActivity'
      }
    };

    this.webIntent.startActivity(options).then(
      intent => {
        console.log('Application should be open now!' + JSON.stringify(intent));
      },
      (error) => {
        console.log(`Failed to open application' + ${JSON.stringify(error)}`);
      }
    );
  }

  getIntentData() {

    if (this.platform.is('android') && this.platform.is('capacitor')){

      this.webIntent.getIntent().then(
        intent => {
          console.log('From this.webIntent.getIntent()', JSON.stringify(intent?.extras));
        }
      );

      this.webIntent.onIntent().subscribe(
        intent => {
          if(intent?.extras !== undefined) {
            console.log(`Received intent with extras: ${JSON.stringify(intent?.extras)}`);
            this.intentData = JSON.stringify(intent?.extras);
            console.log('Intent Data: ', this.intentData);
          }
        });
    }
  }

}
