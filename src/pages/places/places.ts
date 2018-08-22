import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent} from '@ionic-native/google-maps';
import { MapsProvider } from '../../providers/maps/maps';
import { Branch } from '../../models/BranchModel';
import { City } from '../../models/CityModel';
import { Restrict } from '../../models/RestrictModel';
import { GeoPoint } from '@firebase/firestore-types';
import { OnInit } from '@angular/core';

declare var google;
let map: any;
let currentBounds: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 200000,
  maximumAge: 0
};
let markersArry = [];
@Component({
  selector: 'places',
  templateUrl: 'places.html'
})
export class places implements OnInit {
  areaID: number;
  branches: Branch[];
  branchesDDL: Branch[];
  cities: City[];
  cityName:string;
  restrictName:string;
  branchName:string;
  restricts: Restrict[];

  @ViewChild('map') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public platform: Platform, private mapsProvider: MapsProvider) {
  }

  ngOnInit() {
    this.getCities();
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  getCities(){
    this.mapsProvider.getCitiesProv().subscribe(cities => this.cities = cities);
  }


  onCityChange(city:string)
  {
    this.clearMarkers();
    this.getBranchesOfCityRestrict(city).then((result) => {
      this.branches = [...result];
      this.branches.forEach(element => {
        var currentLocation = new google.maps.LatLng(element.CenterPoint.latitude,element.CenterPoint.longitude);
          this.createMarker(element.CenterPoint,element.Name);
      });
  });
    this.goToCityLocation(city);
  }

  onRestrictChange(city:string, restrict:string)
  {
    this.clearMarkers();
    this.getBranchesOfCityRestrict(city,restrict).then((result) => {
      this.branchesDDL = [...result];
      this.branchesDDL.forEach(element => {
        var currentLocation = new google.maps.LatLng(element.CenterPoint.latitude,element.CenterPoint.longitude);
          this.createMarker(element.CenterPoint,element.Name);
          this.moveToLocation(element.CenterPoint);
      });
  });
  
  }
  
  getRestrictsCity(cityName:string){
    this.mapsProvider.getRestrictsCityProv(cityName).subscribe(restricts => this.restricts = restricts );
  }

  getBranchesOfCityRestrict(city:string, restrict:string = undefined){
    var x = this.mapsProvider.getBranchesCityProv(city,restrict)
    return x;
  }

  loadMap() {
    map = new GoogleMap('map');
    map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      this.initMap()
    });
  }

  async set_bounds (){
    do {
      await this.delay(200);
    } while (map.getBounds()==undefined);

}

  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: location.coords.latitude, lng: location.coords.longitude },
        zoom: 9,
        fullscreenControl: false
      });
      this.set_bounds().then(function () {
        currentBounds = map.getBounds();
      });
      var cityName = (location.coords.longitude<=30.086384 && location.coords.longitude >= 29.534382)?"الإسكندرية":(location.coords.longitude<=30.086384 && location.coords.longitude >= 31.227967)?"القاهرة":""
      this.getBranchesOfCityRestrict(cityName).then((result) => {
        this.branches = [...result];
        this.branches.forEach(element => {
          var currentLocation = new google.maps.LatLng(element.CenterPoint.latitude,element.CenterPoint.longitude);
            this.createMarker(element.CenterPoint,element.Name);
        });
      });
    }, (error) => {
      console.log(error);
    }, options);
  }

  async delay(milliseconds: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, milliseconds);
    });
  }

  createMarker(place:GeoPoint, branchName:string) {
    var marker = new google.maps.Marker({
      map: map,
      position: {lat:place.latitude,lng:place.longitude},
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
  deleteMarkers(){
      this.clearMarkers();
      markersArry = [];
  }
  
  goToCityLocation(city: string){
    this.mapsProvider.getCityCenterPointProv(city).then((result) => {
      this.moveToLocation(result);
    });
  }

  moveToLocation(centerPoint:GeoPoint){
    var center = new google.maps.LatLng(centerPoint.latitude, centerPoint.longitude);
    map.panTo(center);
  }
}