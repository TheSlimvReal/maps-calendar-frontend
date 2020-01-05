import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ReportComponent} from './report/report.component';
import {ModuleWithProviders} from '@angular/core';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'report', component: ReportComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
