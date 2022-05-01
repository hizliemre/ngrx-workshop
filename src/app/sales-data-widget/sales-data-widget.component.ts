import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { SalesDataService } from '../api/sales-data.service';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  data: any;
  loading: boolean;
  loaded: boolean;

  constructor(private readonly _salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this._getData();
  }

  refresh(): void {
    this._getData();
  }

  private _getData(): void {
    this.loading = true;
    this.loaded = false;
    this._salesDataService
      .getSalesData(this.category)
      .pipe(take(1))
      .subscribe((data) => {
        this.data = data;
        this.loading = false;
        this.loaded = true;
      });
  }

}
