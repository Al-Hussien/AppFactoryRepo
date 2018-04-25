import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,public navParm: NavParams, private occasionProvider: OccasionProvider) {
  }

  ngOnInit() {
    this.getOffers();
    this.occasionProvider.getOccasions().subscribe(occasions => {
      this.occasions = occasions;
      this.occasions.forEach(element => {
        element.StartDateDay = (new Date(element.StartDate.toString())).getDate().toString();
        element.StartDateMonth = ((new Date(element.StartDate.toString())).getMonth()+1).toString();
        element.EndDateDay = (new Date(element.EndDate.toString())).getDate().toString();
        element.EndDateMonth = ((new Date(element.EndDate.toString())).getMonth()+1).toString();
        element.OfferDays = Math.round(
          (
            Date.parse(new Date(element.EndDate.toString()).toString())
            -
            Date.parse(new Date(element.StartDate.toString()).toString())
          )/(1000*60*60*24)
        ).toString();

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
        ).toString():"0";
        element.OfferDaysPast = (parseInt(element.OfferDays) - parseInt(element.DaysLeft)).toString();
        element.PublishDays = Math.round(
          (
            Date.parse(new Date().toString())
            -
            Date.parse(new Date(element.StartDate.toString()).toString())
          )/(1000*60*60*24)
        )<=0?"0":Math.round(
          (
            Date.parse(new Date().toString())
            -
            Date.parse(new Date(element.StartDate.toString()).toString())
          )/(1000*60*60*24)
        ).toString();
        element.OfferStatusCSS = parseInt(element.DaysLeft)  > 0 ?"":"offer-ended";




        // days left calc days letf
        // calc total days
        //divide 
        debugger
        element.DaysPastPercentageCSS = 
          (
            Math.round((parseInt(element.OfferDaysPast)/parseInt(element.OfferDays)*100)* 100) / 100
          )>0?
          (
            Math.round((parseInt(element.OfferDaysPast)/parseInt(element.OfferDays)*100)* 100) / 100
          ).toString()
          :
          "100";
      });
    });
  }

  getOffers()
  {

  }


  openOfferPage(inputData: Occasion ) {
    this.navCtrl.push(InofferPage, {"inofferObject":inputData});
  }

}
