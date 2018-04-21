import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'places',
  templateUrl: 'places.html'
})
export class places {
  cityID: number;
  areaID: number;

  constructor(public navCtrl: NavController) {

  }

}
