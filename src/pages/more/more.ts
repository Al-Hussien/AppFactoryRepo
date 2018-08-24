import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Cnst_PlayStoreAppURL } from '../../DataFiles/AboutAppDataFile';

@Component({
  selector: 'more',
  templateUrl: 'more.html'
})
export class more {
  imgUrlAbout: string;
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing) {
    this.imgUrlAbout = Cnst_PlayStoreAppURL;
  }
  eval(){window.open(this.imgUrlAbout);}
  shareOffer(){
    this.socialSharing.share("حمل تطبيق عروض فتح الله","فتح الله ماركت",null,this.imgUrlAbout)
    .then(function (params:any) {})
    .catch(function (params:any) {})
  }
}
