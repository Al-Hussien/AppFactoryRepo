//system service
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpModule } from '@angular/http';
//Page
import { places } from '../pages/places/places';
import { fav } from '../pages/fav/fav';
import { offers } from '../pages/offers/offers';
import { more } from '../pages/more/more';
import { InofferPage } from '../pages/inoffer/inoffer';
import { TabsPage } from '../pages/tabs/tabs';
//provider
import { OccasionProvider } from '../providers/occasion/occasion';
import { MapsProvider } from '../providers/maps/maps';
import { InofferProvider } from '../providers/inoffer/inoffer';
//plugin
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicImageLoader } from 'ionic-image-loader';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { OneSignal } from '@ionic-native/onesignal';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';




//Live Firebase Credential Dont Delete
// const environment = {
//   production: false,
//   firebase: {
//     apiKey: "AIzaSyDKPUdUajTvL_-hj0qCtnF3_JtM1beIVCA",
//     authDomain: "fatmrkt.firebaseapp.com",
//     databaseURL: "https://fatmrkt.firebaseio.com",
//     projectId: "fatmrkt",
//     storageBucket: "fatmrkt.appspot.com",
//     messagingSenderId: "21815449607"
//   }
// };
//Development Firebase Credential
const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAEqNTb4U7EXuS_0rJhZ-holgBZ8RJ0SnM",
    authDomain: "fatmrktreplica.firebaseapp.com",
    databaseURL: "https://fatmrktreplica.firebaseio.com",
    projectId: "fatmrktreplica",
    storageBucket: "fatmrktreplica.appspot.com",
    messagingSenderId: "589204348937"
  }
};
@NgModule({
  declarations: [
    MyApp,
    places,
    fav,
    offers,
    InofferPage,
    more,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(environment.firebase, 'fatMrkt'),
    AngularFirestoreModule,
    HttpModule,
    IonicImageLoader.forRoot(),
    LazyLoadImageModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    places,
    fav,
    offers,
    InofferPage,
    more,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OccasionProvider,
    InofferProvider,
    Geolocation,
    MapsProvider,
    SocialSharing,
    OneSignal,
    AdMobFree
  ]
})
export class AppModule {}
