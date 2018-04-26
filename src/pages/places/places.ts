import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { MapsProvider } from '../../providers/maps/maps';
import { Branch } from '../../models/BranchModel';
// import { googlemaps, google} from '@types/googlemaps';

declare var google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 200000,
  maximumAge: 0
};
@Component({
  selector: 'places',
  templateUrl: 'places.html'
})
export class places {
  cityID: number;
  areaID: number;
  branches: Branch[];
  // map:GoogleMap;

  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public platform: Platform, private mapsProvider: MapsProvider) {
    debugger
    platform.ready().then(() => {
      this.loadMap();
    });
    // this.mapsProvider.getBranchesProv().subscribe(branches => this.branches = branches );
    this.getBranchesOfCity("Cairo");

  }
  loadMap() {
    debugger
    map = new GoogleMap('map');

    map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
      this.initMap()
    });
  }
  initMap() {
    debugger
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 15
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: {lat: location.coords.latitude, lng: location.coords.longitude},
        radius: 1000,
        type: ['store']
      }, (results,status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
          }
        }
      });
    }, (error) => {
      console.log(error);
    }, options);
    var myplace = {lat: -33.8665, lng: 151.1956};
  }

  createMarker(place) {
    debugger
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });

    google.maps.event.addListener(marker, 'click', function() {
      debugger
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
  getCities()
  {}
  getRestriction(cityID:string)
  {}
  getBranchesOfCity(city:string)
  {
    debugger
    this.mapsProvider.getBranchesCityProv(city).subscribe(branches => this.branches = branches );
    let x = this.cityID;
    //this.branches.filter(oo => oo.CityID == cityID);
  }
  getBranchesOfRestriction(cityID:string)
  {
    return [];
  }
  moveCameraTo(longPoint:string, latPoint:string)
  {}
  deleteMarkers()
  {}
 }