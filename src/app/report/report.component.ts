import {Component, OnInit} from '@angular/core';
import {CalendarService, ReportPeriod} from '../calendar.service';
import {CalendarEntry} from '../calendarEntry';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private calendarService: CalendarService) { }

  dayReport = 0;
  weekReport = 0;
  monthReport = 0;
  yearReport = 0;

  entries: CalendarEntry[] = [];

  ngOnInit() {
    this.loadReports();
    this.calendarService.getAllCalendarEntries().then(res => this.entries = res);
  }

  async loadReports() {
    this.dayReport = await this.calendarService.getReportFor(ReportPeriod.DAY);
    this.weekReport = await this.calendarService.getReportFor(ReportPeriod.WEEK);
    this.monthReport = await this.calendarService.getReportFor(ReportPeriod.MONTH);
    this.yearReport = await this.calendarService.getReportFor(ReportPeriod.YEAR);
  }
}
