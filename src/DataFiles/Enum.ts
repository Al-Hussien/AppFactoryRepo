export {
    City as Enm_City, 
    AlexRestriction as Enm_AlexRestriction, 
    CairoRestriction as Enm_CairoRestriction, 
    MapZoomLevel as Enm_MapZoomLevel,
    CityCoordinates as Enm_CityCoordinates,
    BranchCoordinates as Enm_BranchCoordinates,
    CityNumberId as Enm_CityNumberId
}

enum City {
    Alexandria = "الإسكندرية",
    Cairo = "القاهرة",
    NorthernCoast = "الساحل الشمالي"
}

enum CityNumberId {
    Alexandria = 1,
    Cairo = 2,
    NorthernCoast = 3
}

enum CityCoordinates{
    AlexandriaLat = 31.2127744,
    AlexandriaLong = 29.8962446,
    CairoLat = 30.0925803,
    CairoLong = 31.2718762,
    NorthernCoastLat = 30.8281563,
    NorthernCoastLong = 28.9646791,
}


enum BranchCoordinates{
    SanstefanoLat = 31.2465766,
    SanstefanoLong = 29.9664597,
    AlbytashByankyLat = 31.1028028,
    AlbytashByankyLong = 29.7510727,
    RozannaLat = 30.9102792,
    RozannaLong = 29.4331637,
}

enum AlexRestriction {
    minLongitude = 29.534382,
    maxLongitude = 30.086384,
}
enum CairoRestriction {
    minLongitude = 30.086384,
    maxLongitude = 31.227967,
}

enum MapZoomLevel {
    Level = 9,
}