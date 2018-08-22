import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/observable';

import { Branch } from '../../models/BranchModel';
import { City } from '../../models/CityModel';
import { Restrict } from '../../models/RestrictModel';
import { GeoPoint } from '@firebase/firestore-types';
import { About } from '../../models/AboutModel';

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
  
  aboutCollection: AngularFirestoreCollection<About>;
  abouts: Observable<About[]>;
  aboutDoc: AngularFirestoreDocument<About>;
  abtArry:About[]=[];
  
  constructor(public afs: AngularFirestore) {
  }

  getCitiesProv(){
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

  getRestrictsCityProv(city:string){
    this.branchesCollection = this.afs.collection('Branches');
    this.branches = this.branchesCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Branch;
        data.id = a.payload.doc.id;
        return data;
      }).filter(opt => opt.City == city);
    });
    return this.branches;
  }




  getCityCenterPointProv(city: string) {
    return this.afs.collection('Cities').ref.get().then((querySnapshot)=> {
      return this.castAndGetCenterPoint(querySnapshot,city);
    });
  }
  castAndGetCenterPoint(firebaseCitiesCollection: any, city: string){
    let cityLoc:GeoPoint=undefined;
    firebaseCitiesCollection.forEach(function(doc) {
      var tempData = doc.data() as City;
      if(tempData.Name == city){
        cityLoc = tempData.CenterPoint;
      }
    });
    return cityLoc;
  }

  getBranchesCityProv(city:string, restrict:string){
    return this.afs.collection('Branches').ref.get().then((querySnapshot)=> {
      return this.castAndFilter(querySnapshot,city,restrict);
    })
  }
  castAndFilter(firebaseBranchesCollection:any,city:string, restrict:string){
    let branarry:Branch[]=[];
    firebaseBranchesCollection.forEach(function(doc) {
      var tempData = doc.data() as Branch;
      if(tempData.City == city&&(restrict==undefined || tempData.Name == restrict)){
        branarry.push(doc.data() as Branch);
      }
    });
    this.branchesArry = branarry;
    return this.branchesArry;
  }
}
