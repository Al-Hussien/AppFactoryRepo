import { GeoPoint } from "@firebase/firestore-types";

export interface Branch {
    id?: string;
    Name: string;
    CenterPoint: GeoPoint;
    City: string;
    Restriction: string;
  }