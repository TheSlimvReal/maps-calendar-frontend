import { Injectable } from '@angular/core';
import {CalendarEntry} from './calendarEntry';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly saveEntryEndpoint = 'https://calendar-app-backend.herokuapp.com/entries';
  // private readonly saveEntryEndpoint = 'http://localhost:8080/entries';
  constructor(private http: HttpClient) { }

  saveEntry(entry: any) {
    let params = new HttpParams();
    Object.keys(entry).forEach(key => params = params.append(key, entry[key]));
    params = params.set('start', entry.start.toISOString());
    params = params.set('end', entry.end.toISOString());
    this.http.post(this.saveEntryEndpoint, null, {params})
      .subscribe(res => console.log(res));
  }
}
