import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EffectSources } from '@ngrx/effects';
import { ReducerManager, Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { filterReducer } from '../ngrx-infra';
import { getDataActions } from './+state/actions';
import { SalesDataWidgetEffects } from './+state/effects';
import { reducer, SALES_DATA_WIDGET_FEATURE_KEY } from './+state/reducer';
import { salesDataWidgetSelectors, SalesDataWidgetViewModel } from './+state/selectors';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [
    SalesDataWidgetEffects
  ]
})
export class SalesDataWidgetComponent implements OnInit, OnDestroy {

  @Input() category: string = '';

  viewModel$: Observable<SalesDataWidgetViewModel>;


  private readonly _identifier = Guid.create().toString();

  constructor(
    private readonly _store: Store,
    private readonly _effects: SalesDataWidgetEffects,
    private readonly _effectSources: EffectSources,
    private readonly _reducerManager: ReducerManager
  ) { }

  ngOnInit(): void {
    this._reducerManager.addReducer(SALES_DATA_WIDGET_FEATURE_KEY(this._identifier), filterReducer(this._identifier, reducer));
    this._effects.init(this._identifier);
    this._effectSources.addEffects(this._effects);
    this.initAsyncs();
    this.refresh();
  }

  ngOnDestroy(): void {
    this._reducerManager.removeReducer(SALES_DATA_WIDGET_FEATURE_KEY(this._identifier));
  }

  refresh(): void {
    this._store.dispatch(getDataActions.getData({ identifier: this._identifier, category: this.category }));
  }

  private initAsyncs(): void {
    this.viewModel$ = this._store.select(salesDataWidgetSelectors.selectViewModel(this._identifier));
  }
}
