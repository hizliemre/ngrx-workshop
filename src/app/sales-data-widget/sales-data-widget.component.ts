import { Component, Input, OnInit, Self } from '@angular/core';
import { DestroyService } from '../destroy/destroy.service';
import { SalesDataWidgetData } from '../widget-data.model';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [DestroyService]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  data: SalesDataWidgetData;
  loading: boolean;
  loaded: boolean;

  constructor(
    @Self() private readonly _destroy$: DestroyService,
  ) { }

  ngOnInit(): void {
    this.initAsyncs();
  }

  refresh(): void { }

  private initAsyncs(): void { }
}
