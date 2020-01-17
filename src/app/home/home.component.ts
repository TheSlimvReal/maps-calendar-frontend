import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddEntryComponent} from '../add-entry/add-entry.component';
import {CalendarService} from '../calendar.service';
import {CalendarEntry} from '../calendarEntry';
import {GoogleMap} from '@angular/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public entries: CalendarEntry[] = [];

  @ViewChild('map') map: GoogleMap;

  constructor(
    private calendarService: CalendarService,
    private dialog: MatDialog
  ) { }

  center: google.maps.LatLngLiteral = {lng: 8.418479132289349, lat: 49.01336057043188};

  date = new Date(Date.now());

  ngOnInit() {
    this.loadCalendarEntries();
  }

  loadCalendarEntries() {
    this.calendarService.subscribeToChanges()
      .subscribe(res => {
        this.entries = res;
        const bounds = new google.maps.LatLngBounds();
        this.entries.forEach(e => bounds.extend({lng: e.longitude, lat: e.latitude}));
        this.map.fitBounds(bounds);
      });
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

  entryClick(entry: CalendarEntry) {
    this.center = {lng: entry.longitude, lat: entry.latitude};
  }

  dateChange() {
    this.calendarService.getEntriesByDate(this.date)
      .then(res => this.entries = res);
  }
}
