import { GeoPoint } from "@firebase/firestore-types";

export interface City {
    id?: string;
    Name: string;
    CenterPoint: GeoPoint;
  }