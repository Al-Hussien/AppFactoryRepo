import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';

import { Branch } from '../../models/BranchModel';
import { forEach } from '@firebase/util';

@Injectable()
export class MapsProvider {
  branchesCollection: AngularFirestoreCollection<Branch>;
  branches: Observable<Branch[]>;
  branchDoc: AngularFirestoreDocument<Branch>;

  constructor(public afs: AngularFirestore) {
    this.branchesCollection = this.afs.collection('Branches');
    this.branches = this.branchesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Branch;
        data.id = a.payload.doc.id;
        return data;
      })
    });
  }

  getBranchesCityProv(city:string)
  {
    this.branches = this.branchesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Branch;
        data.id = a.payload.doc.id;
        return data;
      }).filter(opt => opt.City == city);
    });
    return this.branches;
  }
  getBranchesProv() {
    debugger
    
  //   this.branchesCollection.ref.where("City", "==", "Cairo").get().then(function(doc) {
  //     if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch(function(error) {
  //     console.log("Error getting document:", error);
  // });

    return this.branches;
  }
}
