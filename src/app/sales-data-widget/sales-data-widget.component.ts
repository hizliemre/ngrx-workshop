import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EffectSources } from '@ngrx/effects';
import { ActionReducer, ReducerManager, Store, UPDATE } from '@ngrx/store';
import { Feature } from '@ngrx/store/src/feature_creator';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { getDataActions } from './+state/actions';
import { SalesDataWidgetEffects } from './+state/effects';
import { salesDataWidgetFeature, SalesDataWidgetState } from './+state/reducer';
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
  private _feature: Feature<Record<string, any>, string, SalesDataWidgetState>;
  constructor(
    private readonly _store: Store,
    private readonly _effects: SalesDataWidgetEffects,
    private readonly _effectSources: EffectSources,
    private readonly _reducerManager: ReducerManager,
  ) { }

  ngOnInit(): void {
    this._feature = salesDataWidgetFeature(this._identifier);
    this._reducerManager.addReducer(this._feature.name, this.filterReducer(this._identifier, this._feature.reducer));
    this._effects.init(this._identifier);
    this._effectSources.addEffects(this._effects);
    this.initAsyncs();
    this.refresh();
  }

  ngOnDestroy(): void {
    this._reducerManager.removeReducer(this._feature.name);
  }

  refresh(): void {
    this._store.dispatch(getDataActions.getData({ identifier: this._identifier, category: this.category }));
  }

  filterReducer = <T>(identifier: string, reducer: ActionReducer<T>) => (state: T, action: any) => {
    if (action.type === UPDATE) return reducer(state, action);
    if (action.identifier && action.identifier === identifier) return reducer(state, action);
    return state;
  }

  private initAsyncs(): void {
    this.viewModel$ = this._store.select(salesDataWidgetSelectors.selectViewModel(this._identifier));
  }
}
