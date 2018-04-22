import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Occasion } from '../../models/occasionModel';

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
export class InofferPage {
  occasionObject: Occasion;
  ImageURLArray:string[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    debugger
    this.occasionObject = this.navParams.get('inofferObject');
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    if(ImageArrayOject != null){
      this.ImageURLArray = ImageArrayOject["imgArry"];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InofferPage');
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

}
