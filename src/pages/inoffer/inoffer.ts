import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Occasion } from '../../models/occasionModel';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ImageLoader } from 'ionic-image-loader';
import { OnInit } from '@angular/core';

/**
 * Generated class for the InofferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inoffer',
  templateUrl: 'inoffer.html',
})
export class InofferPage implements OnInit {
  occasionObject: Occasion;
  ImageURLArray:string[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private socialSharing: SocialSharing/*,private imageLoader: ImageLoader*/) {
  }

  ngOnInit() {
    debugger
    this.occasionObject = this.navParams.get('inofferObject');
    
  }

  ionViewWillEnter() {
    debugger
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    if(ImageArrayOject != null){
      this.ImageURLArray = ImageArrayOject["imgArry"];
    }
  }


  addFav(imgUrl: string ) {
    debugger
    this.ImageURLArray.push(imgUrl)
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

    this.socialSharing.share('com.facebook.katana',"Fathallah Market Offer",null,"https://www.djamware.com/post/58a1378480aca7386754130a/ionic-2-fcm-push-notification")
    .then(function (params:any) {
      console.log("succeed");
    }).catch(function (params:any) {
      console.log("failed");
    })
    // this.socialSharing.shareViaFacebook("Fathallah Market Offer",imgUrl,"https://www.djamware.com/post/58a1378480aca7386754130a/ionic-2-fcm-push-notification")
    // .then(function (params:any) {
    //   console.log("succeed");
    // }).catch(function (params:any) {
    //   console.log("failed");
    // })
  }

}
