import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import * as countrycitystatejson from 'countrycitystatejson';
//const countrycitystatejson= require('countrycitystatejson')
// npm install -D @types/countrycitystatejson

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  url :string = "https://raw.githubusercontent.com/sagarshirbhate/Country-State-City-Database/master/Contries.json";

  constructor(private httpClient: HttpClient) { }

  //private countryData = countrycitystatejson;

  getAllCountries(): Observable<any> {
    return this.httpClient.get("assets/countries-states-cities.json");
  }

  // getStatesByCountry(countryShotName: string) {
  //   return this.countryData.getStatesByShort(countryShotName);
  // }

  // getCitiesByState(country: string, state: string) {
  //   return this.countryData.getCities(country, state);
  // }

}
