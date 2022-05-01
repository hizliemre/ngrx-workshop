import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map, Subject, switchAll, takeUntil, tap } from 'rxjs';
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

    const source$ = this._salesDataService.getSalesData(this.category)
      .pipe(
        tap((data) => {
          this.data = data;
          this.loading = false;
          this.loaded = true;
        })
      );

    this._apiTrigger$.pipe(
      map(() => {
        this.loading = true;
        this.loaded = false;
        return source$;
      }),
      switchAll(),
      takeUntil(this._destroy$)
    ).subscribe();

  }
}
