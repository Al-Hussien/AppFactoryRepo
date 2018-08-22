import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'fav',
  templateUrl: 'fav.html'
})
export class fav {
  ImageURLArray:string[];

  constructor(public navCtrl: NavController, 
              private socialSharing: SocialSharing) {
    
  }

  ionViewWillEnter() {
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    this.ImageURLArray = ImageArrayOject["imgArry"];
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
    this.socialSharing.share("حمل تطبيق عروض فتح الله","فتح الله ماركت",imgUrl,"https://www.google.com/")
    .then(function (params:any) {
      // console.log("succeed");
    }).catch(function (params:any) {
      // console.log("failed");
    })
    
  }
}