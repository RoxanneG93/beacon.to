import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController , Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';


declare var google;


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  // this is getting ElementRef object
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;

  isTracking = false;
  trackedRoute = [];
  previousTracks = [];

  positionSubscription: Subscription;

  constructor(public navCtrl: NavController, private plt: Platform, private geolocation: Geolocation, private storage: Storage) { }

  ionViewDidLoad() {
    // this shows the ElementRef -- we are looking for the nativeElement property
    console.log(this.mapElement);
    this.plt.ready().then(() => {
      this.loadHistoricRoutes();

      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
      // this is where we target the nativeElement (#div in our html) and set the mapOptions above
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.geolocation.getCurrentPosition().then(pos => {
        let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(16);
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
  startTracking() {
    this.isTracking = true;
    this.trackedRoute = [];

    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter((p) => p.coords !== undefined) //Filter Out Errors
      )
      .subscribe(data => {
        setTimeout(() => {
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude });
          this.redrawPath(this.trackedRoute);
        }, 0);
      });

  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }

  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);

    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }

  showHistoryRoute(route) {
    this.redrawPath(route);
  }
}


