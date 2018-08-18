import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Occasion } from '../../models/occasionModel';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OnInit } from '@angular/core';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@IonicPage()
@Component({
  selector: 'page-inoffer',
  templateUrl: 'inoffer.html',
})
export class InofferPage implements OnInit {
  occasionObject: Occasion;
  oddEnterCount: number;
  ImageURLArray:string[]=[];
  StyleCSSArry:{imgUrl:String,CSSStyle:String,elemNo:number}[]=[];

 admobFlagInit:boolean=false;

  interstitialConfig: AdMobFreeInterstitialConfig ={
    autoShow: true,
    isTesting:true,
    id:'ca-app-pub-5131427677496672/9712693594'
  }



  constructor(
    platform: Platform
    ,public navCtrl: NavController
    , public navParams: NavParams
    ,private socialSharing: SocialSharing
    ,private admobFree: AdMobFree
  ) {

      // platform.registerBackButtonAction(() => 
      // {
      //   this.initAdMob();
      //   this.navCtrl.pop();
      // },1);
      this.admobFree.interstitial.config(this.interstitialConfig);

      this.admobFree.interstitial.prepare()
      .then(() => {
        if (true) {
          this.admobFlagInit = true;
        }
      })
      .catch(e => console.log(e));

    }

  ngOnInit() {
    this.occasionObject = this.navParams.get('inofferObject');
  }
  ionViewWillLeave() {
    if (this.oddEnterCount % 2 != 0) {
      this.initAdMob();
    }
    // this.initAdMob();
  }
  goBack() {
    // if (this.oddEnterCount % 2 != 0) {
    //   this.initAdMob();
    // }
    this.navCtrl.pop()
  }

  ionViewWillEnter() {
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    var oddEnterOject = JSON.parse(localStorage.getItem("oddEnterCount"));
    if(oddEnterOject != null){
      this.oddEnterCount = oddEnterOject["oddEnterCount"];
      this.oddEnterCount++;
      console.log("ionenter=",this.oddEnterCount);
      oddEnterOject["oddEnterCount"] = this.oddEnterCount;
      localStorage.setItem("oddEnterCount", JSON.stringify(oddEnterOject));
    }
    else
    {
      this.oddEnterCount = 1;
      console.log("ionenter=",this.oddEnterCount);
      var tempObj: { oddEnterCount: number; } = { oddEnterCount: this.oddEnterCount };
      oddEnterOject = {...tempObj}
      localStorage.setItem("oddEnterCount", JSON.stringify(oddEnterOject));
    }
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
    this.socialSharing.share("حمل تطبيق عروض فتح الله","فتح الله ماركت",imgUrl,"https://www.google.com/")
    .then(function (params:any) {
    }).catch(function (params:any) {
    })
  }
  initAdMob()
  {
    if (this.admobFlagInit) {
    this.admobFree.interstitial.show();
    }
  }
}
