import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Information } from '../models/data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http:HttpClient) { }

  getData():Observable<any> {
    return this._http.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
  }
  
}

