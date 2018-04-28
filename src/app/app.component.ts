import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
//import { CacheService } from "ionic-cache";
// import { ImgCacheService } from 'ng-imgcache';
import { ImageLoaderConfig } from 'ionic-image-loader';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

constructor(platform: Platform/*, cache: CacheService*/, statusBar: StatusBar, splashScreen: SplashScreen, /*imgCache: ImgCacheService*/ private imageLoaderConfig: ImageLoaderConfig) {
    platform.ready().then(() => {
      this.imageLoaderConfig.enableDebugMode();
      this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
      this.imageLoaderConfig.setFallbackUrl('assets/imgs/logo.png');
      this.imageLoaderConfig.setMaximumCacheAge(60*24*60*60*1000);
      // Set TTL to 12h
      //cache.setDefaultTTL(60 * 60 * 12);
      // Keep our cached results when device is offline!
      // cache.setOfflineInvalidate(false);

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      // imgCache.init({
        
      //   // Pass any options here...
      // });
    });
  }
}
