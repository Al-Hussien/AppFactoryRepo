import { Component, ViewChild  } from '@angular/core';
import { Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild('myNav') nav: NavController

constructor(platform: Platform, statusBar: StatusBar,splashScreen: SplashScreen,
            private imageLoaderConfig: ImageLoaderConfig,
            private admobFree: AdMobFree
    ) {
    platform.ready().then(() => {
      this.imageLoaderConfig.enableFallbackAsPlaceholder(true);
      this.imageLoaderConfig.setMaximumCacheAge(60*24*60*60*1000);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.initAdMob();
      splashScreen.hide();
    });
  }

  initAdMob()
  {
    const bannerConfig: AdMobFreeBannerConfig = {
      id:'ca-app-pub-5131427677496672/9473220130',
      isTesting: true,
      autoShow: true,
      overlap:true
     };
     
     this.admobFree.banner.config(bannerConfig);
  
     this.admobFree.banner.prepare()
       .then(() => {
        //  alert("Working test")
       })
       .catch(e => console.log(e));
  }
}
