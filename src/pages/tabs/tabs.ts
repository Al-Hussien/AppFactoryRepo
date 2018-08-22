import { Component } from '@angular/core';

import { places } from '../places/places';
import { fav } from '../fav/fav';
import { offers } from '../offers/offers';
import { more } from '../more/more';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = offers;
  tab2Root = places;
  tab3Root = fav;
  tab4Root = more;
  constructor() {

  }
}
