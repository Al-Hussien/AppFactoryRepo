import { Component } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { InofferPage } from '../inoffer/inoffer';

import { OccasionProvider } from '../../providers/occasion/occasion';
import { Occasion } from '../../models/occasionModel';
import { parseDate, DateTimeData } from 'ionic-angular/util/datetime-util';


@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html'
})
export class offers {
  occasions: Occasion[];
  constructor(public navCtrl: NavController, private occasionProvider: OccasionProvider) {
  }

  ngOnInit() {
    this.occasionProvider.getOccasions().subscribe(occasions => {
      this.occasions = occasions;
      this.occasions.forEach(element => {
        
        // this.gc = Date.parse(new Date(element.StartDate.toString()).toString());
        // this.gg = (new Date().getUTCMilliseconds().toString());
        // this.gg = (new Date()).getUTCMilliseconds().toString();
        // element.StartDateDay = parseDate(element.StartDate) ;
        debugger
        element.StartDateDay = (new Date(element.StartDate.toString())).getDate().toString();
        element.StartDateMonth = ((new Date(element.StartDate.toString())).getMonth()+1).toString();
        element.EndDateDay = (new Date(element.EndDate.toString())).getDate().toString();
        element.EndDateMonth = ((new Date(element.EndDate.toString())).getMonth()+1).toString();
        element.DaysLeft = Math.round(
          (
            Date.parse(new Date(element.EndDate.toString()).toString())
            -
            Date.parse(new Date().toString())
          )/(1000*60*60*24)
        )>0?Math.round(
          (
            Date.parse(new Date(element.EndDate.toString()).toString())
            -
            Date.parse(new Date().toString())
          )/(1000*60*60*24)
        ):0;
        element.DaysPast = Math.round(
          (
            Date.parse(new Date().toString())
            -
            Date.parse(new Date(element.StartDate.toString()).toString())
          )/(1000*60*60*24)
        )<=0?"اليوم":"منذ "+
        Math.round(
          (
            Date.parse(new Date().toString())
            -
            Date.parse(new Date(element.StartDate.toString()).toString())
          )/(1000*60*60*24)
        )
        +" ايام";
        element.OfferStatusCSS = element.DaysLeft > 0 ?"":"offer-ended";
        element.DaysLeftPercentageCSS = (Math.round((element.DaysLeft/(
          Math.round(
            (
              Date.parse(new Date(element.EndDate.toString()).toString())
              -
              Date.parse(new Date(element.StartDate.toString()).toString())
            )/(1000*60*60*24)
          )
        )*100)* 100) / 100)>0?(Math.round((element.DaysLeft/(
          Math.round(
            (
              Date.parse(new Date(element.EndDate.toString()).toString())
              -
              Date.parse(new Date(element.StartDate.toString()).toString())
            )/(1000*60*60*24)
          )
        )*100)* 100) / 100).toString():"100";
      });
    });
  }
  openOfferPage() {
    this.navCtrl.push(InofferPage);
  }

}
