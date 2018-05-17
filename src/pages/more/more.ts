import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MapsProvider } from '../../providers/maps/maps';
import { About } from '../../models/AboutModel';
// import { AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


@Component({
  selector: 'more',
  templateUrl: 'more.html'
})
export class more {
  aboutArry: About[];
  imgUrlAbout: string;
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, private mapsProvider: MapsProvider/*,private admobFree: AdMobFree*/) {
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    // this.initAdMob();
    this.getAboutImg();
  }
  shareOffer(imgUrl: string)
  {
    this.socialSharing.share("حمل تطبيق عروض فتح الله","فتح الله ماركت",imgUrl,"https://www.google.com/")
    .then(function (params:any) {
      // console.log("succeed");
    }).catch(function (params:any) {
      // console.log("failed");
    })
  }
  getAboutImg()
  {
    this.mapsProvider.getAboutImg().then(function (res:About) {
      this.imgUrlAbout = res.ImgUrl;
    })
  }
  // initAdMob()
  // {
  //   const bannerConfig: AdMobFreeBannerConfig = {
  //     id:'ca-app-pub-5131427677496672/9473220130',
  //     // size:,
  //     isTesting: false,
  //     autoShow: true,
  //     overlap:true
      
  //    };
     
  //    this.admobFree.banner.config(bannerConfig);
  
  //    this.admobFree.banner.prepare()
  //      .then(() => {
  //       //  alert("working")
  //        // banner Ad is ready
  //        // if we set autoShow to false, then we will need to call the show method here
  //      })
  //      .catch(e => console.log(e));
  // }
}
