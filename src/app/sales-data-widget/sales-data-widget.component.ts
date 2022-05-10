import { Component, Input, OnInit } from '@angular/core';
import { SalesDataWidgetData } from '../widget-data.model';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  data: SalesDataWidgetData;
  loading: boolean;
  loaded: boolean;

  constructor() { }

  ngOnInit(): void {
    this.initAsyncs();
  }

  refresh(): void { }

  private initAsyncs(): void { }
}
