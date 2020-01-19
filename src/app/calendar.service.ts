import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CalendarEntry} from './calendarEntry';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private readonly getDayReportEndpoint = 'https://calendar-app-backend.herokuapp.com/dayReport';
  private readonly getWeekReportEndpoint = 'https://calendar-app-backend.herokuapp.com/weekReport';
  private readonly getMonthReportEndpoint = 'https://calendar-app-backend.herokuapp.com/monthReport';
  private readonly getYearReportEndpoint = 'https://calendar-app-backend.herokuapp.com/yearReport';
  private readonly saveEntryEndpoint = 'https://calendar-app-backend.herokuapp.com/entries';
  private readonly getAllEntriesEndpoint = 'https://calendar-app-backend.herokuapp.com/entries';
  private readonly getEntriesByDateEndpoint = 'https://calendar-app-backend.herokuapp.com/date';
  private readonly registerLocationEndpoint = 'https://calendar-app-backend.herokuapp.com/registerLocation';
  private readonly deleteEntryEndpoint = 'https://calendar-app-backend.herokuapp.com/entries';
  // private readonly registerLocationEndpoint = 'http://localhost:8080/registerLocation';
  // private readonly saveEntryEndpoint = 'http://localhost:8080/entries';

  private eventBus: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  async saveEntry(entry: any): Promise<any> {
    let params = new HttpParams();
    Object.keys(entry).forEach(key => params = params.append(key, entry[key]));
    params = params.set('start', entry.start.toISOString());
    params = params.set('end', entry.end.toISOString());
    const result = await this.http.post(this.saveEntryEndpoint, null, {params}).toPromise();
    this.eventBus.emit();
    return result;
  }

  getAllCalendarEntries(): Promise<CalendarEntry[]> {
    return this.http.get(this.getAllEntriesEndpoint)
      .toPromise()
      .then(entries => this.mapCalendarResponse(entries));
  }

  async registerLocation(): Promise<CalendarEntry[]> {
    const loc = await this.getCurrentLocation();
    const result = await this.http.post(this.registerLocationEndpoint, null, {params: loc})
      .toPromise()
      .then(res => this.mapCalendarResponse(res));
    this.eventBus.emit();
    return result;
  }

  getEntriesByDate(date?: Date): Promise<CalendarEntry[]> {
    const params = {};
    if (date) {
      // tslint:disable-next-line:no-string-literal
      params['date'] = date.toISOString();
    }
    // TODO order by date
    return this.http.get(this.getEntriesByDateEndpoint, {params})
      .toPromise()
      .then(res => this.mapCalendarResponse(res));
  }

  subscribeToChanges(): Observable<CalendarEntry[]> {
    return new Observable<CalendarEntry[]>((observer) => {
      this.getEntriesByDate().then(res => observer.next(res));
      this.eventBus.subscribe(() => this.getEntriesByDate().then(res => observer.next(res)));
    });
  }

  getReportFor(period: ReportPeriod): Promise<any> {
    let endpoint = '';
    switch (period) {
      case ReportPeriod.DAY: endpoint = this.getDayReportEndpoint; break;
      case ReportPeriod.WEEK: endpoint = this.getWeekReportEndpoint; break;
      case ReportPeriod.MONTH: endpoint = this.getMonthReportEndpoint; break;
      case ReportPeriod.YEAR: endpoint = this.getYearReportEndpoint; break;
    }
    return this.http.get(endpoint).toPromise();
  }

  mapCalendarResponse(response): CalendarEntry[] {
    return response.map(entry => new CalendarEntry(
      entry.id,
      entry.title,
      new Date(entry.start),
      new Date(entry.end),
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

  deleteEntry(id) {
    return this.http.delete(this.deleteEntryEndpoint, {params: {id}})
      .toPromise();
  }
}

export enum ReportPeriod {
  DAY,
  WEEK,
  MONTH,
  YEAR
}
