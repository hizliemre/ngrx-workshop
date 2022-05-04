import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesDataWidgetData } from '../widget-data.model';

@Injectable({ providedIn: 'root' })
export class SalesDataService {

  constructor(private readonly _http: HttpClient) { }

  getSalesData(category: string): Observable<SalesDataWidgetData[]> {
    return this._http.get<SalesDataWidgetData[]>(`http://localhost:3000/sales-data/${category}`)
  }

}
