import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { AdMobFreeBannerConfig, AdMobFree } from '@ionic-native/admob-free';


@Component({
  selector: 'fav',
  templateUrl: 'fav.html'
})
export class fav {
  ImageURLArray:string[];

  constructor(public navCtrl: NavController/*,private admobFree: AdMobFree,*/, private socialSharing: SocialSharing) {
    
  }

  ionViewWillEnter() {
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    this.ImageURLArray = ImageArrayOject["imgArry"];
    // this.initAdMob();
  }

  removeFav(imgUrl: string ) {
    for (let index = 0; index < this.ImageURLArray.length; index++) {
      if (this.ImageURLArray[index] == imgUrl) {
        this.ImageURLArray.splice(index , 1);
      }
      
    }
    
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    if(ImageArrayOject == null)
    {
      var obj: { imgArry: string[]; } = { imgArry: this.ImageURLArray };
      ImageArrayOject = {...obj}
    }
    else
    {
      ImageArrayOject["imgArry"] = this.ImageURLArray;
    }
    localStorage.setItem("FavImage", JSON.stringify(ImageArrayOject));
  }
  shareOffer(imgUrl: string)
  {
    // this.socialSharing.canShareVia('com.facebook.katana','Test canShareVia','Hi there',null,imgUrl)
    // .then(function (params:any) {
    //   console.log("succeed");
    // }).catch(function (params:any) {
    //   console.log("failed");
    // })

    this.socialSharing.share("حمل تطبيق عروض فتح الله","فتح الله ماركت",imgUrl,"https://www.google.com/")
    .then(function (params:any) {
      // console.log("succeed");
    }).catch(function (params:any) {
      // console.log("failed");
    })
    // this.socialSharing.shareViaFacebook("Fathallah Market Offer",imgUrl,"https://www.djamware.com/post/58a1378480aca7386754130a/ionic-2-fcm-push-notification")
    // .then(function (params:any) {
    //   console.log("succeed");
    // }).catch(function (params:any) {
    //   console.log("failed");
    // })
    
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