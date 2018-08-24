import { Branch } from "../models/BranchModel";
import { Enm_BranchCoordinates, Enm_CityNumberId, Enm_CityCoordinates } from "../DataFiles/Enum";
import { City } from "../models/CityModel";

type BranchesArray = Array<Branch>;
export const Cnst_Branches: BranchesArray = [
    {
        id:1,
        Name:"سان ستيفانو",
        CenterPoint:{Latitude:Enm_BranchCoordinates.SanstefanoLat,Longitude:Enm_BranchCoordinates.SanstefanoLong},
        City:"الإسكندرية",
        CityId:Enm_CityNumberId.Alexandria
    } as Branch,
    {
        id:2,
        Name:"البيطاش (بيانكي)",
        CenterPoint:{Latitude:Enm_BranchCoordinates.AlbytashByankyLat,Longitude:Enm_BranchCoordinates.AlbytashByankyLong},
        City:"الإسكندرية",
        CityId:Enm_CityNumberId.Alexandria,
    } as Branch,
    {
        id:3,
        Name:"روزانا",
        CenterPoint:{Latitude:Enm_BranchCoordinates.RozannaLat,Longitude:Enm_BranchCoordinates.RozannaLong},
        City:"الساحل الشمالي",
        CityId:Enm_CityNumberId.NorthernCoast,
    } as Branch,
];

type CitiesArray = Array<City>;

export const Cnst_Cities: CitiesArray = [
    {
        id:1,
        Name:"الإسكندرية",
        CenterPoint:{Latitude:Enm_CityCoordinates.AlexandriaLat,Longitude:Enm_CityCoordinates.AlexandriaLong}
    } as City,
    {
        id:2,
        Name:"القاهرة",
        CenterPoint:{Latitude:Enm_CityCoordinates.CairoLat,Longitude:Enm_CityCoordinates.CairoLong}
    } as City,
    {
        id:3,
        Name:"الساحل الشمالي",
        CenterPoint:{Latitude:Enm_CityCoordinates.NorthernCoastLat,Longitude:Enm_CityCoordinates.NorthernCoastLong}
    } as City,
];