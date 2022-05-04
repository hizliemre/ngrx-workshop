import { Component, Input, OnInit, Self } from '@angular/core';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { SalesDataService } from '../api/sales-data.service';
import { DestroyService } from '../destroy/destroy.service';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [DestroyService]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  data: any;
  loading: boolean;
  loaded: boolean;

  private _apiTrigger$ = new Subject<void>();

  constructor(
    @Self() private readonly _destroy$: DestroyService,
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
        tap((data) => {
          this.data = data;
          this.loading = false;
          this.loaded = true;
        })
      );

    this._apiTrigger$.pipe(
      switchMap(() => {
        this.loading = true;
        this.loaded = false;
        return source$;
      }),
      takeUntil(this._destroy$),
    ).subscribe();
  }
}
