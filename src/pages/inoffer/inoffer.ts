import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Occasion } from '../../models/occasionModel';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { ImageLoader } from 'ionic-image-loader';
import { OnInit } from '@angular/core';
import { offers } from '../offers/offers';

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
  StyleCSSArry:{imgUrl:String,CSSStyle:String,elemNo:number}[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private socialSharing: SocialSharing/*,private imageLoader: ImageLoader*/) {
  }

  ngOnInit() {
    debugger
    this.occasionObject = this.navParams.get('inofferObject');
    
  }
  goBack() {
    this.navCtrl.pop()
  }
  ionViewWillEnter() {
    debugger
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    if(ImageArrayOject != null){
      this.ImageURLArray = ImageArrayOject["imgArry"];
      if (this.ImageURLArray.length >0) {
        for (let index2 = 0; index2 < this.occasionObject.Image.length; index2++) {
          for (let index = 0; index < this.ImageURLArray.length; index++) {
            if (this.ImageURLArray[index] == this.occasionObject.Image[index2]) {
              this.StyleCSSArry.splice(index2 , 1,{imgUrl:this.occasionObject.Image[index2],CSSStyle:"active",elemNo:index2});
              break;
            }
            else{
              this.StyleCSSArry.splice(index2 , 1,{imgUrl:this.occasionObject.Image[index2],CSSStyle:"",elemNo:index2});
            }
          }
        }
      }
      else{
        for (let index = 0; index < this.occasionObject.Image.length; index++) {
          this.StyleCSSArry.splice(index , 1,{imgUrl:this.occasionObject.Image[index],CSSStyle:"",elemNo:index});
          
        }
      }
      
    }
  }


  addFav(imgUrl: string, elemNo:number ) {
    debugger
    // this.StyleCSSArry.splice(elemNo , 1,{imgUrl:this.occasionObject.Image[elemNo],CSSStyle:"active"});
    // this.StyleCSSArry[elemNo]['CSSStyle'] = "active";
    if (this.StyleCSSArry[elemNo].CSSStyle == "active") {
      this.StyleCSSArry.splice(elemNo , 1,{imgUrl:this.occasionObject.Image[elemNo],CSSStyle:"",elemNo:elemNo});
      for (let index = 0; index < this.ImageURLArray.length; index++) {
        if (this.ImageURLArray[index] == imgUrl) {
          this.ImageURLArray.splice(index,1)
        }
      }
    }
    else
    {
      this.StyleCSSArry.splice(elemNo , 1,{imgUrl:this.occasionObject.Image[elemNo],CSSStyle:"active",elemNo:elemNo});
      this.ImageURLArray.push(imgUrl);
    }
    //this.StyleCSSArry.splice(elemNo , 1,{imgUrl:this.occasionObject.Image[elemNo],CSSStyle:"active",elemNo:elemNo});
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
