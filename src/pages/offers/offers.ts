import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InofferPage } from '../inoffer/inoffer';


@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html'
})
export class offers {

  constructor(public navCtrl: NavController) {

  }
  openOfferPage() {
    this.navCtrl.push(InofferPage);
  }

}
