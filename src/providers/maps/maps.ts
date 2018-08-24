import { Injectable } from '@angular/core';
import { Cnst_Cities, Cnst_Branches } from '../../DataFiles/branchDataFile';
import { Branch } from '../../models/BranchModel';
import { CenterPointLoc } from '../../models/GeoPointLocModel';
import { City } from '../../models/CityModel';

@Injectable()
export class MapsProvider {
  
  
  constructor() {
  }
  getCities(): City[] {
    return Cnst_Cities;
  }
  getCitiesByFilter(filter:(value: Branch, index: number, array: Branch[]) => any): Branch[] {
    debugger
    return Cnst_Branches.filter(filter)
  }
  getCityCenterPoint(cityId?: number):CenterPointLoc {
    return Cnst_Cities.find(cty=>cty.id == cityId).CenterPoint;
  }
}
