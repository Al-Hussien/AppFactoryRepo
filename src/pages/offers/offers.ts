import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { InofferPage } from '../inoffer/inoffer';

import { OccasionProvider } from '../../providers/occasion/occasion';
import { Occasion } from '../../models/occasionModel';
import { parseDate, DateTimeData } from 'ionic-angular/util/datetime-util';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { OnInit } from '@angular/core';

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html'
})
export class offers {
  occasions: Occasion[];
  ZeroDays: Occasion[];
  MoreThanZeroDays: Occasion[];
  tempArry: Occasion[];
  

  
  OccCnt:number=0;
  
  constructor(public navCtrl: NavController,public navParm: NavParams, private occasionProvider: OccasionProvider, public localNotifications: LocalNotifications,
    public platform: Platform,
    public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    var ImageArrayOject = JSON.parse(localStorage.getItem("FavImage"));
    var OccassionNewCountOject = JSON.parse(localStorage.getItem("OccCnt"));
    if(ImageArrayOject == null){
      var obj: { imgArry: string[]; } = { imgArry: [] };
      ImageArrayOject = {...obj}
      localStorage.setItem("FavImage", JSON.stringify(ImageArrayOject));
    }
    if(OccassionNewCountOject == null){
      var obj2: { OccCnt: number; } = { OccCnt: 0 };
      OccassionNewCountOject = {...obj2}
      localStorage.setItem("OccCnt", JSON.stringify(OccassionNewCountOject));
    }
    else{
      var OccassionNewCount = JSON.parse(localStorage.getItem("OccCnt"));
      this.OccCnt = OccassionNewCount["OccCnt"];
    }

    this.occasionProvider.getOccasions().subscribe(occasions => {
      //this.OccCnt = occasions.length.toString();
      
      if(this.OccCnt < occasions.length)
      {
        this.fireNotification(occasions.length-this.OccCnt);
        this.OccCnt = occasions.length;
        var OccassionNewCountOject = JSON.parse(localStorage.getItem("OccCnt"));
        if(OccassionNewCountOject == null)
        {
          var obj: { OccCnt: number; } = { OccCnt: this.OccCnt };
          OccassionNewCountOject = {...obj}
        }
        else
        {
          OccassionNewCountOject["OccCnt"] = this.OccCnt;
        }
        localStorage.setItem("OccCnt", JSON.stringify(OccassionNewCountOject));
      }

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

        element.DaysLeft = (Math.round(
          (
            Date.parse(new Date(element.EndDate.toString()).toString())
            -
            Date.parse(new Date().toString())
          )/(1000*60*60*24)
        )+1)>0?(Math.round(
          (
            Date.parse(new Date(element.EndDate.toString()).toString())
            -
            Date.parse(new Date().toString())
          )/(1000*60*60*24)
        )+1).toString():"0";

        element.DaysLeftString = parseInt(element.DaysLeft) == 0 ?"انتهى":"باقى "+element.DaysLeft + " يوم";
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


        
        // this.occasions.forEach(element => {})
        // days left calc days letf
        // calc total days
        //divide 
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

      this.sortOccasion(this.occasions);
    });
  }


  openOfferPage(inputData: Occasion ) {
    this.navCtrl.push(InofferPage, {"inofferObject":inputData});
  }

  fireNotification(newOccCnt) {
    var date = new Date();
    this.localNotifications.schedule({
      text: 'كارفور',
      led: 'FF0000',
      sound: this.setSound(),
    });
    let alert = this.alertCtrl.create({
      title: 'عرض جديد!',
      subTitle: 'يوجد '+ newOccCnt +' عرض جديد',
      buttons: ['OK']
    });
    alert.present();
  }
  // addThis(elem)
  // {
  //   this.tempArry.push(elem);
  // }
  sortOccasion(newOccCnt) {
    debugger
    var newArr:Occasion[];
    newArr = [...newOccCnt];

    this.ZeroDays = newArr.filter(occ => occ.DaysLeft ===  "0");
    this.MoreThanZeroDays = newArr.filter(occ => occ.DaysLeft !==  "0");
    this.MoreThanZeroDays.sort((a, b)=>
          {
            return parseInt(a.PublishDays) - parseInt(b.PublishDays);
          }
        )
        this.ZeroDays.sort((a, b)=>
          {
            return parseInt(a.PublishDays) - parseInt(b.PublishDays);
          }
        )
    this.occasions = [];
    this.occasions = this.MoreThanZeroDays.concat(this.ZeroDays);
    // this.occasions = [...this.MoreThanZeroDays]
    // this.occasions.concat(this.MoreThanZeroDays,this.ZeroDays)//.concat(this.ZeroDays);
    //this.occasions.concat(this.ZeroDays)//.concat(this.ZeroDays);
}
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
  

}
