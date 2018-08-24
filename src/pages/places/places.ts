import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent} from '@ionic-native/google-maps';
import { MapsProvider } from '../../providers/maps/maps';
import { Branch } from '../../models/BranchModel';
import { City } from '../../models/CityModel';
import { OnInit } from '@angular/core';
import { Enm_AlexRestriction, Enm_CairoRestriction, Enm_MapZoomLevel, Enm_CityNumberId } from '../../DataFiles/Enum';
import { CenterPointLoc } from '../../models/GeoPointLocModel';
import { Cnst_MapOptions } from '../../DataFiles/mapDataFile';

declare var google;
let map: any;
let mapsOptions = Cnst_MapOptions;
let markersArry = [];
@Component({
  selector: 'places',
  templateUrl: 'places.html'
})
export class places implements OnInit {
  branches: Branch[];
  cities: City[];
  cityId: number;
  branchId:number;

  @ViewChild('map') mapElement: ElementRef;
  constructor( public navCtrl: NavController, public platform: Platform, private mapsProvider: MapsProvider ) {
  }

  ngOnInit() {
    this.cities = this.mapsProvider.getCities();
    this.platform.ready().then(() => {
      this.initiateMap();
    });
  }
  initiateMap() {
    map = new GoogleMap('map');
    map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      navigator.geolocation.getCurrentPosition(
        (location)=> this.PositionOnCallBackCameraMapSetting(location), 
        (error) => {console.log(error);}, 
        mapsOptions);
    });
  }
  PositionOnCallBackCameraMapSetting(location: Position){
    map = this.setMapCameraPositionToCurrentLocation(location);
    var cityID = this.getCityIdFromCurrentGPSLocation(location);
    this.cityId = cityID;
    this.branches = this.mapsProvider.getCitiesByFilter(opt=>opt.CityId == cityID);
    this.putBranchesMarkerOnMap(this.branches);
  }
  setMapCameraPositionToCurrentLocation(location: Position){
    return new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: { lat: location.coords.latitude, lng: location.coords.longitude },
        zoom: Enm_MapZoomLevel.Level,
        fullscreenControl: false
      }
    );
  }
  getCityIdFromCurrentGPSLocation(location: Position){
    return ( location.coords.longitude >= Enm_AlexRestriction.minLongitude && location.coords.longitude <= Enm_AlexRestriction.maxLongitude )?
      Enm_CityNumberId.Alexandria
      :
      ( location.coords.longitude <= Enm_CairoRestriction.minLongitude && location.coords.longitude >= Enm_CairoRestriction.maxLongitude )?
      Enm_CityNumberId.Cairo
      :
      0;
  }
  putBranchesMarkerOnMap(branches: Branch[]){
    branches.forEach((brnch)=>{
      this.createMarker(brnch.CenterPoint,brnch.Name)
    })
  }
  onCityChange(cityId:number){
    debugger
    this.clearMarkers();
    this.branches = this.mapsProvider.getCitiesByFilter(opt => opt.CityId == cityId);
    this.branches.forEach((brnch) => { this.createMarker(brnch.CenterPoint,brnch.Name); });
    this.goToCityLocation(cityId);
  }

  goToCityLocation(cityId: number){
    var cityCenterPoint = this.mapsProvider.getCityCenterPoint(cityId);
    this.moveToLocation(cityCenterPoint);
  }
  onRestrictChange(cityId:number, branchId:number)
  {
    debugger
    this.clearMarkers();
    var branchesDDL = this.mapsProvider.getCitiesByFilter(opt=> opt.id == branchId && opt.CityId == cityId);
    branchesDDL.forEach(element => {
      this.createMarker(element.CenterPoint,element.Name);
      this.moveToLocation(element.CenterPoint);
    });
  
  }
  moveToLocation(centerPoint:CenterPointLoc){
    var center = new google.maps.LatLng(centerPoint.Latitude, centerPoint.Longitude);
    map.panTo(center);
  }
  createMarker(place:CenterPointLoc, branchName:string) {
    var marker = new google.maps.Marker({
      map: map,
      position: {lat:place.Latitude,lng:place.Longitude},
      title:branchName
    });
    markersArry.push(marker);
    this.addInfoWindow(marker,branchName)
  }
  addInfoWindow(marker, message) {
    var infoWindow = new google.maps.InfoWindow({
        content: message
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map, marker);
    });
  }
  clearMarkers() {
    for (let index = 0; index < markersArry.length; index++) {
      markersArry[index].setMap(null);
    }
  }
}