import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SalesDataService } from '../api/sales-data.service';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
})
export class SalesDataWidgetComponent implements OnInit, OnDestroy {

  @Input() category: string = '';

  data: any;
  loading: boolean;
  loaded: boolean;

  private _destroy$ = new Subject<void>();
  private _apiTrigger$ = new Subject<void>();

  constructor(private readonly _salesDataService: SalesDataService) { }

  ngOnInit(): void {
    this.initAsyncs();
    this._apiTrigger$.next();
  }

  refresh(): void {
    this._apiTrigger$.next();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initAsyncs(): void {
    this._apiTrigger$.pipe(
      takeUntil(this._destroy$),
      switchMap(() => {
        this.loading = true;
        this.loaded = false;
        return this._salesDataService.getSalesData(this.category)
          .pipe(
            takeUntil(this._destroy$),
            tap((data) => {
              this.data = data;
              this.loading = false;
              this.loaded = true;
            })
          );
      }),
    ).subscribe();
  }
}
