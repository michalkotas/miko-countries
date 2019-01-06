import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material-module';
import {CountryListComponent} from './country-list/country-list.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { SettingsComponent } from './settings/settings.component';
import {SettingsService} from './services/settings.service';
import {CountryService} from './services/country.service';
import {CurrencyService} from './services/currency.service';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryDetailsComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [SettingsService, CountryService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
