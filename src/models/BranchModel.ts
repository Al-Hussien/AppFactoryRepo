import { CenterPointLoc } from "./GeoPointLocModel";

export interface Branch  {
    id: number;
    Name: string;
    CenterPoint: CenterPointLoc;
    City: string;
    CityId: Number;
  }


  // export class BranchClass implements Branch  {
  //    id?: string;
  //    Name: string;
  //    CenterPoint: GeoPoint;
  //    City: string;
  //    CityId: number;
  //    Restriction: string;

  //   constructor(Name:string, CenterPoint:GeoPoint, City:string,CityId:number, id?:string){
  //     this.Name = Name;
  //     this.CenterPoint = CenterPoint;
  //     this.City = City;
  //     this.id = id;
  //     this.CityId = CityId;
  //   }
// }