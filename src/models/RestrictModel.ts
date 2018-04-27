import { GeoPoint } from "@firebase/firestore-types";

export interface Restrict {
    id?: string;
    Name: string;
    CenterPoint: GeoPoint;
    City: string;
  }