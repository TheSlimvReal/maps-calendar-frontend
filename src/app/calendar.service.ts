import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CalendarEntry} from './calendarEntry';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly saveEntryEndpoint = 'https://calendar-app-backend.herokuapp.com/entries';
  private readonly getAllEntriesEndpoint = 'https://calendar-app-backend.herokuapp.com/entries';
  private readonly getEntriesByDateEndpoint = 'https://calendar-app-backend.herokuapp.com/date';
  private readonly registerLocationEndpoint = 'https://calendar-app-backend.herokuapp.com/registerLocation';
  // private readonly registerLocationEndpoint = 'http://localhost:8080/registerLocation';
  // private readonly saveEntryEndpoint = 'http://localhost:8080/entries';
  constructor(private http: HttpClient) { }

  saveEntry(entry: any): Promise<any> {
    let params = new HttpParams();
    Object.keys(entry).forEach(key => params = params.append(key, entry[key]));
    params = params.set('start', entry.start.toISOString());
    params = params.set('end', entry.end.toISOString());
    return this.http.post(this.saveEntryEndpoint, null, {params}).toPromise();
  }

  getAllCalendarEntries(): Promise<CalendarEntry[]> {
    return this.http.get(this.getAllEntriesEndpoint)
      .toPromise()
      .then(entries => this.mapCalendarResponse(entries));
  }

  async registerLocation(): Promise<CalendarEntry[]> {
    const loc = await this.getCurrentLocation();
    return this.http.post(this.registerLocationEndpoint, null, {params: loc})
      .toPromise()
      .then(res => this.mapCalendarResponse(res));
  }

  getEntriesByDate(): Promise<CalendarEntry[]> {
    // TODO order by date
    return this.http.get(this.getEntriesByDateEndpoint)
      .toPromise()
      .then(res => this.mapCalendarResponse(res));
  }

  mapCalendarResponse(response): CalendarEntry[] {
    return response.map(entry => new CalendarEntry(
      entry.id,
      entry.title,
      entry.start,
      entry.end,
      entry.location.x,
      entry.location.y,
      entry.notes,
      entry.attended
    ));
  }

  getCurrentLocation(): Promise<{longitude, latitude}> {
    return new Promise<{longitude, latitude}>((
      (resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          loc => resolve({
            longitude: loc.coords.longitude,
            latitude: loc.coords.latitude
          }),
          res => reject(res))
    ));
  }
}
