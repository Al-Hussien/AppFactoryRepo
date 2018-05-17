import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { places } from '../pages/places/places';
import { fav } from '../pages/fav/fav';
import { offers } from '../pages/offers/offers';
import { more } from '../pages/more/more';
import { InofferPage } from '../pages/inoffer/inoffer';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OccasionProvider } from '../providers/occasion/occasion';
import { MapsProvider } from '../providers/maps/maps';

import { InofferProvider } from '../providers/inoffer/inoffer';

import { Geolocation } from '@ionic-native/geolocation';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { SocialSharing } from '@ionic-native/social-sharing';

import { IonicImageLoader } from 'ionic-image-loader';


// import { ImgCacheModule } from 'ng-imgcache';
// import { CacheModule } from 'ionic-cache';
import { HttpModule } from '@angular/http';

import { LazyLoadImageModule } from 'ng2-lazyload-image';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { OneSignal } from '@ionic-native/onesignal';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDKPUdUajTvL_-hj0qCtnF3_JtM1beIVCA",
    authDomain: "fatmrkt.firebaseapp.com",
    databaseURL: "https://fatmrkt.firebaseio.com",
    projectId: "fatmrkt",
    storageBucket: "fatmrkt.appspot.com",
    messagingSenderId: "21815449607"
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
    // CacheModule.forRoot()
    // ImgCacheModule
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
    LocalNotifications,
    SocialSharing,
    OneSignal,
    AdMobFree
  ]
})
export class AppModule {}
