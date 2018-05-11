import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent} from '@ionic-native/google-maps';
import { MapsProvider } from '../../providers/maps/maps';
import { Branch } from '../../models/BranchModel';
import { City } from '../../models/CityModel';
import { Restrict } from '../../models/RestrictModel';
import { GeoPoint } from '@firebase/firestore-types';
// import { Title } from '@angular/platform-browser';
// import { googlemaps, google} from '@types/googlemaps';
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
  // map:GoogleMap;

  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public platform: Platform, private mapsProvider: MapsProvider) {
    
  }

  ngOnInit() {
    debugger
    //fill the city ddl
    this.getCities();
    //fill up map
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  getCities()
  {
    this.mapsProvider.getCitiesProv().subscribe(cities => this.cities = cities);
  }


  onCityChange(city:string)
  {
    this.clearMarkers();//done
    //this.getRestrictsCity(city);//done
    this.getBranchesOfCityRestrict(city).then((result) => {
      this.branches = [...result];
      // this.branchesDDL = [...this.branches];
      this.branches.forEach(element => {
        var currentLocation = new google.maps.LatLng(element.CenterPoint.latitude,element.CenterPoint.longitude);
        //if ( currentBounds.contains(currentLocation)) {
          this.createMarker(element.CenterPoint,element.Name);
        //}
      });
  });
    this.goToCityLocation(city);
  }

  onRestrictChange(city:string, restrict:string)
  {
    // var branchCenterPoint;
    this.clearMarkers();//done
    this.getBranchesOfCityRestrict(city,restrict).then((result) => {
      this.branchesDDL = [...result];
      this.branchesDDL.forEach(element => {
        var currentLocation = new google.maps.LatLng(element.CenterPoint.latitude,element.CenterPoint.longitude);
        //if ( currentBounds.contains(currentLocation)) {
          this.createMarker(element.CenterPoint,element.Name);
          this.moveToLocation(element.CenterPoint);
        //}
      });
  });
  
  }
  
  getRestrictsCity(cityName:string)
  {
    this.mapsProvider.getRestrictsCityProv(cityName).subscribe(restricts => this.restricts = restricts );
  }

  getBranchesOfCityRestrict(city:string, restrict:string = undefined)
  {
    var x = this.mapsProvider.getBranchesCityProv(city,restrict)//.subscribe(branches => this.branches = branches );
    return x;
  }

  loadMap() {
    map = new GoogleMap('map');

    map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      this.initMap()
    });
  }

  async set_bounds (){
    
         //ok to query bounds here
    do {
      await this.delay(200);
    } while (map.getBounds()==undefined);

}


  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: location.coords.latitude, lng: location.coords.longitude},
        zoom: 9,
        fullscreenControl: false
      });
      this.set_bounds().then(function () {
        currentBounds = map.getBounds();
      });
      var cityName = (location.coords.longitude<=30.086384 && location.coords.longitude >= 29.534382)?"الإسكندرية":(location.coords.longitude<=30.086384 && location.coords.longitude >= 31.227967)?"القاهرة":""
      //try to get the city location dynamic
      this.getBranchesOfCityRestrict(cityName).then((result) => {
        this.branches = [...result];
        this.branches.forEach(element => {
          var currentLocation = new google.maps.LatLng(element.CenterPoint.latitude,element.CenterPoint.longitude);
          //if ( currentBounds.contains(currentLocation)) {
            this.createMarker(element.CenterPoint,element.Name);
          //}
        });
    });
      

      // infowindow = new google.maps.InfoWindow();
      // var service = new google.maps.places.PlacesService(map);

      // service.nearbySearch({
      //   location: {lat: location.coords.latitude, lng: location.coords.longitude},
      //   radius: 1000,
      //   type: ['store']
      // }, (results,status) => {
      //   if (status === google.maps.places.PlacesServiceStatus.OK) {
      //     for (var i = 0; i < results.length; i++) {
      //       this.createMarker(results[i]);
      //     }
      //   }
      // });

      
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
    //var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: {lat:place.latitude,lng:place.longitude},
      title:branchName
    });
    // marker.addListener('click', function() {
    //   infowindow.open(map, marker);
    // });
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
  deleteMarkers()
  {
      this.clearMarkers();
      markersArry = [];
  }
  goToCityLocation(city: string)
  {
    this.mapsProvider.getCityCenterPointProv(city).then((result) => {
      this.moveToLocation(result);
  });
    
  }

  moveToLocation(centerPoint:GeoPoint)
  {
    var center = new google.maps.LatLng(centerPoint.latitude, centerPoint.longitude);
    // using global variable:
    map.panTo(center);

  }

 }