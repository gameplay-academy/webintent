# Ionic WebIntent
Ionic WebIntent Implementation

This is an example on how to implement the Ionic Framework (Capacitor) Native WebIntent
On this demo we will implement 3 different ways of using the WebIntents:

1. Using the WebIntent to open a URL
2. Opening a native Android application 
3. Opening a custom application 

We also show how to pass parameters from one application to the other and how to control the navigation from app1 <- -> app2 

Implementation 

1. Create your first Ionic app 
```terminal
ionic start app1 --type=angular --capacitor --package-id=com.gameplay.app1 blank
```
2. Create your second app
```terminal
ionic start app2 --type=angular --capacitor --package-id=com.gameplay.app2 blank
```
3. Open App #1 and install the Ionic WebIntent Native plugin
```terminal
npm install com-darryncampbell-cordova-plugin-intent
npm install @ionic-native/web-intent
```

4. Install the @ionic/core dependency 
```terminal
npm install @ionic-native/core
```

5. Let's add your Android platform support 
   Open an terminal window on your IDE and write the following command 
```terminal
ionic cap add android 
```
   
6. Once the you android platform support has been added, go ahead and open the AndroidManifest file under
   android > app > src > main > AndroidManifest.xml 

   On the android manifest we need to add the intent filter for the application to be able to access the command
   
   Copy and paste this code under the main intent-filter
   
```xml
<intent-filter>
  <action android:name="com.darryncampbell.cordova.plugin.intent.ACTION"/>
  <category android:name="android.intent.category.DEFAULT"/>
</intent-filter>
```

7. Open the src > app > app.module.ts
   Add the import to the WebIntent provider 
   Import the WebIntent from  @ionic-native/web-intent/ngx
   Add the WebIntent as a provider under app.module provider list 
```javascript
providers: [
{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
WebIntent
],
```
8. Open the home.page.ts under src > app > home > home.page.ts

   Add the import for the web intent and the intent options 
```javascript
import { WebIntent, IntentOptions } from '@ionic-native/web-intent/ngx';
```
   Inject the web intent into the constructor
```javascript
constructor(private webIntent: WebIntent){}
```
  Create a callBrowserWebIntent, callNativeAppWebIntent and callCustomAppIntent methods
  ```javascript
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
        launchingAppPackage:'com.gameplay.app1',
        launchingAppClass: 'com.gameplay.app1.MainActivity'
      }
    };

    this.webIntent.startActivity(options).then(
      intent => { console.log('Web Intent was successful', intent); },
      error => {console.log('Error, Web Intent failed', error);}
    );
  }
```
9. Open your home.page.htom located under src > app > home > home.page.ts

Copy and paste the code below inside the div > container

```html
<strong>Web Intent: Browser example</strong>
<p><ion-button (click)="callBrowserWebIntent()">Browser Intent</ion-button></p>
<br>
<strong>Web Intent: Native App example</strong>
<p><ion-button (click)="callNativeAppWebIntent()">Native App Intent</ion-button></p>
<br>
<strong>Web Intent: Custom App</strong>
<p><ion-button (click)="callCustomAppIntent()">Custom App Intent</ion-button></p>
```

9. Open app #2 and repeat steps 3 to 8
   ○ Modify the app package name from the callCustomApp method. Change the package name from app1 to app2 to enable the App2 to return to app1

10. Open app #2 home.page.ts and pastes the following code inside the div > container 
```html
<strong>Web Intent: Custom App</strong>
<p><ion-button (click)="callCustomAppIntent()">Custom App Intent</ion-button></p>
```

11. Build app #1 and #2 for android by using the following command 
```terminal
ionic cap build android 
```

12. On Android Studio deploy both application before testing the callCustomApp method

Enjoy!


Video Tutorial





   

 
