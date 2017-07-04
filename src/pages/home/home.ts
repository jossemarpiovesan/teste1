import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   map: GoogleMap;

  constructor(public navCtrl: NavController,public platform: Platform, private geolocation: Geolocation) { 
    platform.ready().then(() => {
      this.loadMap();
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
         let location = new LatLng(data.coords.latitude, data.coords.longitude);

         this.map = new GoogleMap('map', {
           'backgroundColor': 'white',
           'controls': {
             'compass': true,
             'myLocationButton': true,
             'indoorPicker': true,
             'zoom': true
           },
           'gestures': {
             'scroll': true,
             'tilt': true,
             'rotate': true,
             'zoom': true
           },
           'camera': {
             'latLng': location,
             'tilt': 30,
             'zoom': 15,
             'bearing': 50
           }
         });

         this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
           console.log('Map is ready!');
         });
      });
    });
  }

  loadMap() {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      console.log(resp.coords.latitude+", "+resp.coords.longitude);
      let location = new LatLng(resp.coords.latitude, resp.coords.longitude);

      this.map = new GoogleMap('map', {
        'backgroundColor': 'white',
        'controls': {
          'compass': true,
          'myLocationButton': true,
          'indoorPicker': true,
          'zoom': true
        },
        'gestures': {
          'scroll': true,
          'tilt': true,
          'rotate': true,
          'zoom': true
        },
        'camera': {
          'latLng': location,
          'tilt': 30,
          'zoom': 15,
          'bearing': 50
        }
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
}
