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
  imgUrlAbout: string;
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, private mapsProvider: MapsProvider) {
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getAboutImg();
  }
  shareOffer(imgUrl: string)
  {

    this.socialSharing.share("حمل تطبيق عروض فتح الله","فتح الله ماركت",imgUrl,"https://www.google.com/")
    .then(function (params:any) {
      console.log("succeed");
    }).catch(function (params:any) {
      console.log("failed");
    })
  }
  getAboutImg()
  {
    this.mapsProvider.getAboutImg().then(function (res:About) {
      this.imgUrlAbout = res.ImgUrl;
    })
    var temp 
  }
}
