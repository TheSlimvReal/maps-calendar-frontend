import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddEntryComponent} from '../add-entry/add-entry.component';
import {CalendarService} from '../calendar.service';
import {CalendarEntry} from '../calendarEntry';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public entries: CalendarEntry[] = [];

  constructor(
    private calendarService: CalendarService,
    private dialog: MatDialog
  ) { }

  center: google.maps.LatLngLiteral = {lng: 8.418479132289349, lat: 49.01336057043188};

  ngOnInit() {
    this.loadCalendarEntries();
  }

  loadCalendarEntries() {
    this.calendarService.subscribeToChanges()
      .subscribe(res => this.entries = res);
  }

  mapClicked(event) {
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    const dialog = this.dialog.open(AddEntryComponent, {data: {longitude, latitude}});
    dialog.afterClosed().subscribe(res => res ? this.loadCalendarEntries() : null);
  }

  centerMap() {
    this.calendarService.getCurrentLocation()
      .then(loc => this.center = {lng: loc.longitude, lat: loc.latitude});
  }
}
