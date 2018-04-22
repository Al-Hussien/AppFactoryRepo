import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'fav',
  templateUrl: 'fav.html'
})
export class fav {
  ImageURLArray:string[];

  constructor(public navCtrl: NavController) {
    debugger
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    this.ImageURLArray = ImageArrayOject["imgArry"];

  }

}
