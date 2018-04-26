import { GeoPoint } from "@firebase/firestore-types";

export interface Branch {
    id?: string;
    Name: string;
    Location: GeoPoint;
    City: string;
    Restriction: string;
  }