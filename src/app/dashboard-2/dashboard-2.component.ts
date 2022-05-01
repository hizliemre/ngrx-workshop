import { Component, OnInit } from '@angular/core';
import { SalesDataService } from '../api/sales-data.service';

@Component({
  selector: 'dashboard-2',
  templateUrl: './dashboard-2.component.html',
})
export class Dashboard2Component implements OnInit {

  electronicSalesData$ = this._salesDataService.getSalesData('electronic');

  constructor(private readonly _salesDataService: SalesDataService) { }

  ngOnInit(): void { }

}
