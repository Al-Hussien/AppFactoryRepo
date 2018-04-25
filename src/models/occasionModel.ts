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
    DaysLeft: string;
    PublishDays: string;
    OfferDaysPast: string;
    OfferDays: string;
    Branch: Branch[];
    Image: String[];
    OfferStatusCSS: string;
    DaysPastPercentageCSS: string;
    Title: string;
  }