import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {CountryListComponent} from './country-list/country-list.component';
import {CountryDetailsComponent} from './country-details/country-details.component';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'countries',
    component: CountryListComponent
  },
  {
    path: 'country/:alpha3Code',
    component: CountryDetailsComponent
  },
  { path: '**', redirectTo: '/countries', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
