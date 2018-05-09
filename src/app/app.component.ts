import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
//import { CacheService } from "ionic-cache";
// import { ImgCacheService } from 'ng-imgcache';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitial, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

constructor(platform: Platform/*, cache: CacheService*/, statusBar: StatusBar, splashScreen: SplashScreen, /*imgCache: ImgCacheService*/ private imageLoaderConfig: ImageLoaderConfig,private admobFree: AdMobFree) {
    platform.ready().then(() => {
      //this.imageLoaderConfig.enableDebugMode();
      this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
      //this.imageLoaderConfig.setFallbackUrl('assets/imgs/logo.png');
      this.imageLoaderConfig.setMaximumCacheAge(60*24*60*60*1000);
      // Set TTL to 12h
      //cache.setDefaultTTL(60 * 60 * 12);
      // Keep our cached results when device is offline!
      // cache.setOfflineInvalidate(false);



      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initAdMob();
      // imgCache.init({
        
      //   // Pass any options here...
      // });
    });
  }

  initAdMob()
  {
    debugger
    const bannerConfig: AdMobFreeBannerConfig = {
      // id:'ca-app-pub-5131427677496672/9473220130',
      // size:,
      isTesting: true,
      autoShow: true
     };
     
     this.admobFree.banner.config(bannerConfig);
  
     this.admobFree.banner.prepare()
       .then(() => {
        //  alert("working")
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));

    const interstitialConfig: AdMobFreeInterstitialConfig ={
      autoShow: true,
      isTesting:true,
      // id:'ca-app-pub-5131427677496672/9712693594'
    }
this.admobFree.interstitial.config(interstitialConfig);
this.admobFree.interstitial.prepare()
      .then(() => {
        // alert("workingIntertial")
        this.admobFree.interstitial.show();
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => console.log(e));
  }
}
