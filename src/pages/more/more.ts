import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MapsProvider } from '../../providers/maps/maps';
import { About } from '../../models/AboutModel';


@Component({
  selector: 'more',
  templateUrl: 'more.html'
})
export class more {
  aboutArry: About[];
  imgUrlAbout: string = "https://play.google.com/store/apps/details?id=com.fatMrkt";
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, private mapsProvider: MapsProvider/*,private admobFree: AdMobFree*/) {
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.imgUrlAbout = "https://play.google.com/store/apps/details?id=com.fatMrkt";
  }
  eval()
  {
    debugger
    window.open("https://play.google.com/store/apps/details?id=com.fatMrkt");
  }
  shareOffer(imgUrl: string)
  {
    debugger
    this.socialSharing.share("حمل تطبيق عروض فتح الله","فتح الله ماركت",null,this.imgUrlAbout)
    .then(function (params:any) {
      // console.log("succeed");
    }).catch(function (params:any) {
      // console.log("failed");
    })
  }
}
