import { Component, Input, OnInit } from '@angular/core';
import { SalesDataService } from '../api/sales-data.service';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  data: any;

  constructor(private readonly _salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this._salesDataService
      .getSalesData(this.category)
      .subscribe((data) => this.data = data);
  }

}
