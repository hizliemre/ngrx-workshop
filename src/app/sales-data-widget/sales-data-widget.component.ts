import { Component, Inject, Input, OnInit, Self } from '@angular/core';
import { OBSERVE, Observed, ObserveFn, OBSERVE_PROVIDER } from 'ng-observe';
import { Subject, switchMap, tap } from 'rxjs';
import { SalesDataService } from '../api/sales-data.service';
import { SalesDataWidgetData } from '../widget-data.model';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [OBSERVE_PROVIDER]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  data: Observed<SalesDataWidgetData>;
  loading: boolean;
  loaded: boolean;

  private _apiTrigger$ = new Subject<void>();

  constructor(
    @Self() @Inject(OBSERVE) private _observe: ObserveFn,
    private readonly _salesDataService: SalesDataService,
  ) { }

  ngOnInit(): void {
    this.initAsyncs();
    this._apiTrigger$.next();
  }

  refresh(): void {
    this._apiTrigger$.next();
  }

  private initAsyncs(): void {

    const source$ = this._salesDataService.getSalesData(this.category)
      .pipe(
        tap(() => {
          this.loading = false;
          this.loaded = true;
        })
      );

    const trigger$ = this._apiTrigger$
      .pipe(
        switchMap(() => {
          this.loading = true;
          this.loaded = false;
          return source$
        })
      );

    this.data = this._observe(trigger$);
  }
}
