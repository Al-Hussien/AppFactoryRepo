import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { more } from '../more/more';


@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html'
})
export class offers {

  constructor(public navCtrl: NavController) {

  }
  openMorePage() {
    this.navCtrl.push(more);
  }

}
