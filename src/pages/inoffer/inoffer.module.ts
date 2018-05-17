import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InofferPage } from './inoffer';

@NgModule({
  declarations: [
    
  ],
  imports: [
    IonicPageModule.forChild(InofferPage),
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class InofferPageModule {}
