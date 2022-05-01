import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SalesDataService {

  constructor(private readonly _http: HttpClient) { }

  getSalesData(category: string): Observable<any> {
    return this._http.get(`api/sales-data/${category}`)
  }

}
