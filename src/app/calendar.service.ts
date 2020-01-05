import { Injectable } from '@angular/core';
import {CalendarEntry} from './calendarEntry';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly saveEntryEndpoint = 'https://calendar-app-backend.herokuapp.com/entries';
  constructor(private http: HttpClient) { }

  saveEntry(entry: any) {
    let params = new HttpParams();
    Object.keys(entry).forEach(key => params = params.append(key, entry[key]));
    console.log('queryparams', params.keys());
    this.http.post(this.saveEntryEndpoint, null, {params})
      .subscribe(res => console.log(res));
  }
}
