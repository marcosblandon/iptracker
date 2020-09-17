import {Component, OnInit} from '@angular/core';
import { IpTrackerServiceService } from './ip-tracker-service.service';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  constructor(private ip:IpTrackerServiceService){}

  title = 'iptracker';
  ipAddress:string;
  lat:string;
  lng:string;
  timezone:string;
  city:string;
  country:string;
  isp:string;

  map: Leaflet.Map;

  ngOnInit(){
    this.getIP();

  }

  getIP(){
    this.ip.getIPAddress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      this.getLocation();
    });
  }
  getLocation(){
      this.ip.getIPDetails(this.ipAddress).subscribe((res:any)=>{
      this.lat=res.location.lat;
      this.lng=res.location.lng;
      this.city=res.location.city;
      this.country=res.location.country;
      this.isp=res.isp;
      this.timezone= 'UTC ' + res.location.timezone;

      //reset map
      let container = Leaflet.DomUtil.get('map');
      if(container != null){
        container._leaflet_id = null;
      }

      this.renderMap();
    });
  }
  renderMap(){
    this.map = Leaflet.map('map').setView([this.lat, this.lng], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Marcos Test',
    }).addTo(this.map);

    let customIcon = Leaflet.icon({
      iconUrl: '/assets/images/icon-location.svg',
      iconSize:     [30, 50], // size of the icon
      iconAnchor:   [22, 94],
      popupAnchor:  [-3, -76]
    });

    Leaflet.marker([this.lat, this.lng], {icon: customIcon}).addTo(this.map).bindPopup(this.city + ', ' + this.country).openPopup();
  }

  onEnterIpAddress(event: any) {
    this.ipAddress = event.target.value;
    this.getLocation();
  }

  onClickIpAddress() {
    this.getLocation();
  }

  onIpChange(event: any){
    this.ipAddress = event.target.value;
  }
}
