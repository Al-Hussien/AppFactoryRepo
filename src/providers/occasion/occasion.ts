import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';

import { Occasion } from '../../models/occasionModel';
// import { parseDate } from 'ionic-angular/util/datetime-util';

@Injectable()
export class OccasionProvider {
  occasionsCollection: AngularFirestoreCollection<Occasion>;
  occasions: Observable<Occasion[]>;
  occasionDoc: AngularFirestoreDocument<Occasion>;

  constructor(public afs: AngularFirestore) {
    this.occasionsCollection = this.afs.collection('Occasion');
    this.occasions = this.occasionsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Occasion;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
  getOccasions() {
    return this.occasions;
  }
}
