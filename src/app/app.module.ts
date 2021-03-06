import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import {routing} from './app.routing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {GoogleMapsModule} from '@angular/google-maps';
import { AddEntryComponent } from './add-entry/add-entry.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {HttpClientModule} from '@angular/common/http';
import {CalendarService} from './calendar.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CommonModule} from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    HeaderComponent,
    AddEntryComponent
  ],
  imports: [
    BrowserModule,
    routing,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    GoogleMapsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    HttpClientModule,
    MatExpansionModule,
    FlexLayoutModule,
    MatSnackBarModule,
    CommonModule,
    MatProgressBarModule,
    MatDatepickerModule,
    FormsModule,
    MatNativeDateModule
  ],
  providers: [
    CalendarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
