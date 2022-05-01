import { Component, OnInit } from '@angular/core';
import { SalesDataService } from '../api/sales-data.service';

@Component({
  selector: 'dashboard-1',
  templateUrl: './dashboard-1.component.html',
})
export class Dashboard1Component implements OnInit {

  electronicSalesData$ = this._salesDataService.getSalesData('electronic');
  bookSalesData$ = this._salesDataService.getSalesData('book');

  constructor(private readonly _salesDataService: SalesDataService) { }

  ngOnInit(): void { }

}
