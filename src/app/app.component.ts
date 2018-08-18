import { Component, Renderer, ViewChild  } from '@angular/core';
import { Platform, NavController, ViewController, App} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
//import { CacheService } from "ionic-cache";
// import { ImgCacheService } from 'ng-imgcache';
import { ImageLoaderConfig } from 'ionic-image-loader';
import { AdMobFree, AdMobFreeBannerConfig,  AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild('myNav') nav: NavController

constructor(platform: Platform/*, cache: CacheService*/, statusBar: StatusBar,
   splashScreen: SplashScreen, /*imgCache: ImgCacheService*/ 
   private imageLoaderConfig: ImageLoaderConfig,private admobFree: AdMobFree, renderer: Renderer
   /*
   ,navController:NavController*/
    ) {
    // renderer.listenGlobal('document', 'admob.interstitial.events.CLOSE', (event) => {
      // debugger
      
      //let activeView: ViewController = navController.getActive();
       //let viewName = this.rootPage;
       //console.log(viewName)
       

       //let activeView: ViewControllerthis.nav.getActive();
      // console.log("the name is =",viewName);
      // if(viewName == "page-offers")
      // {}
      // else
      // {
        //platform.exitApp();
      // }
      // debugger
      // let temp = viewCtrl.getActive();
      // let temp2 = viewCtrl.getActive().name;
  // });
    // platform.registerBackButtonAction(() => {
                
    //   this.initAdMob2().then(function () {
    //     platform.exitApp();
    //     // this.interstitial.adc
      
    //   });
    //             },1);
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
      this.initAdMob();
      splashScreen.hide();
      
      // imgCache.init({
        
      //   // Pass any options here...
      // });
    });
  }

  initAdMob()
  {
    const bannerConfig: AdMobFreeBannerConfig = {
      id:'ca-app-pub-5131427677496672/9473220130',
      // size:,
      isTesting: true,
      autoShow: true,
      overlap:true
     };
     
     this.admobFree.banner.config(bannerConfig);
  
     this.admobFree.banner.prepare()
       .then(() => {
        //  alert("working")
         // banner Ad is ready
         // if we set autoShow to false, then we will need to call the show method here
       })
       .catch(e => console.log(e));
  }
  async initAdMob2()
  {

//     const interstitialConfig: AdMobFreeInterstitialConfig ={
//       autoShow: true,
//       isTesting:false,
//       id:'ca-app-pub-5131427677496672/9712693594'
//     }
// this.admobFree.interstitial.config(interstitialConfig);
// this.admobFree.interstitial.prepare()
//       .then(() => {
//         // alert("workingIntertial")
//         this.admobFree.interstitial.show();
//         // banner Ad is ready
//         // if we set autoShow to false, then we will need to call the show method here
//       })
//       .catch(e => console.log(e));
  }
}
