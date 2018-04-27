import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';

import { Branch } from '../../models/BranchModel';
import { forEach } from '@firebase/util';
import { City } from '../../models/CityModel';
import { Restrict } from '../../models/RestrictModel';
import { GeoPoint } from '@firebase/firestore-types';

@Injectable()
export class MapsProvider {
  branchesCollection: AngularFirestoreCollection<Branch>;
  branches: Observable<Branch[]>;
  branchDoc: AngularFirestoreDocument<Branch>;
  branchesArry:Branch[]=[];

  cityCollection: AngularFirestoreCollection<City>;
  cities: Observable<City[]>;
  cityDoc: AngularFirestoreDocument<City>;

  restrictsCollection: AngularFirestoreCollection<Restrict>;
  restricts: Observable<Restrict[]>;
  restrictDoc: AngularFirestoreDocument<Restrict>;
  retValLocation: GeoPoint;
  // BranchesDB: object = {
  //   id:1,
  //   longitude:5,
  //   latitude:6,

  // }
  constructor(public afs: AngularFirestore) {
  }

  getCitiesProv()
  {
    this.cityCollection = this.afs.collection('Cities');
    this.cities = this.cityCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as City;
        data.id = a.payload.doc.id;
        return data;
      })
    });
    return this.cities;
  }
  getRestrictsCityProv(city:string)
  {
    this.restrictsCollection = this.afs.collection('Restriction');
    this.restricts = this.restrictsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Restrict;
        data.id = a.payload.doc.id;
        return data;
      }).filter(opt => opt.City == city);
    });
    return this.restricts;
  }

  async getBranchesCityProv(city:string, restrict:string)
  {
    let branarry:Branch[]=[];
    this.afs.collection('Branches').ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        branarry.push(doc.data() as Branch);
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data() as Branch);
      });    
    });
    
    do {
      await this.delay(200);
    } while (branarry.length==0);
    // this.branches = this.branchesCollection.snapshotChanges().map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Branch;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   }).filter(opt => opt.City == city && (restrict==undefined||opt.Restriction == restrict));
    // });
    this.branchesArry = [...branarry];
    
    return this.branchesArry;
  }

  // goToCityLocationProv(city: string) {
  //   var cityCenterPoint = this.getCityCenterPointProv(city);
  //   // this.branchesCollection = this.afs.collection('Cities');
  //   // this.branches = this.branchesCollection.snapshotChanges().map(changes => {
  //   //   return changes.map(a => {
  //   //     const data = a.payload.doc.data() as Branch;
  //   //     data.id = a.payload.doc.id;
  //   //     return data;
  //   //   }).filter(opt => opt.City == city && opt.Location == );
  //   // });
  //   // return this.branches;
  // }
  async delay(milliseconds: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
  getCityCenterPointProv(city: string) {
    this.cityCollection = this.afs.collection('Cities');
    this.cityCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as City;
        data.id = a.payload.doc.id;
        return data;
      }).filter(opt => opt.Name == city)[0].CenterPoint;
    }).subscribe(opt => this.retValLocation = opt);
    return this.retValLocation;
  }
}
