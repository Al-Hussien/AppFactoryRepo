import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OnInit } from '@angular/core';

@Component({
  selector: 'fav',
  templateUrl: 'fav.html'
})
export class fav {
  ImageURLArray:string[];

  constructor(public navCtrl: NavController) {
  }

  ionViewWillEnter() {
    debugger
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    this.ImageURLArray = ImageArrayOject["imgArry"];
  }

  removeFav(imgUrl: string ) {
    debugger
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

}