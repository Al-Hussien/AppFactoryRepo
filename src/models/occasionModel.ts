import { DateTime } from "ionic-angular";
import { Branch } from "../models/BranchModel";

export interface Occasion {
    id?: string;
    StartDate: DateTime;
    EndDate: DateTime;
    StartDateDay: String;
    StartDateMonth: String;
    EndDateDay: String;
    EndDateMonth: String;
    DaysLeft:number;
    Branch: Branch[];
    Image: String[];
    OfferStatusCSS: string;
    DaysLeftPercentageCSS: string;
    Title: string;
  }