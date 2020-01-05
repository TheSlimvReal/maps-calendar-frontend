import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddEntryComponent} from '../add-entry/add-entry.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  center: google.maps.LatLngLiteral = {lng: 8.418479132289349, lat: 49.01336057043188};

  ngOnInit() {
  }

  mapClicked(event) {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    this.dialog.open(AddEntryComponent, {data: {longitude, latitude}});
  }

  centerMap() {
    navigator.geolocation.getCurrentPosition(pos => this.center = {lng: pos.coords.longitude, lat: pos.coords.latitude});
  }
}
