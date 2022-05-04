import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SalesDataWidgetData } from '../widget-data.model';
import { getDataActions } from './+state/actions';
import { salesDataWidgetSelectors } from './+state/selectors';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  data$: Observable<SalesDataWidgetData | null>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private readonly _store: Store) { }

  ngOnInit(): void {
    this.initAsyncs();
    this.refresh();
  }

  refresh(): void {
    this._store.dispatch(getDataActions.getData({ category: this.category }));
  }

  private initAsyncs(): void {
    this.data$ = this._store.select(salesDataWidgetSelectors.selectData);
    this.loading$ = this._store.select(salesDataWidgetSelectors.selectLoading);
    this.loaded$ = this._store.select(salesDataWidgetSelectors.selectLoaded);
  }
}
