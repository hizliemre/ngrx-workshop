import { Component, Input, OnInit } from '@angular/core';
import { EffectSources } from '@ngrx/effects';
import { ActionReducer, ReducerManager, Store, UPDATE } from '@ngrx/store';
import { Guid } from "guid-typescript";
import { Observable } from 'rxjs';
import { getDataActions } from './+state/actions';
import { SalesDataWidgetEffects } from './+state/effects';
import { salesDataWidgetFeature } from './+state/reducer';
import { salesDataWidgetSelectors, SalesDataWidgetViewModel } from './+state/selectors';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [
    SalesDataWidgetEffects
  ]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  viewModel$: Observable<SalesDataWidgetViewModel>;

  private readonly _identifier = Guid.create().toString();

  constructor(
    private readonly _store: Store,
    private readonly _effects: SalesDataWidgetEffects,
    private readonly _effectSources: EffectSources,
    private readonly _reducerManager: ReducerManager,
  ) { }

  ngOnInit(): void {
    const feature = salesDataWidgetFeature(this._identifier);
    this._reducerManager.addReducer(feature.name, this.filterReducer(this._identifier, feature.reducer));
    this._effects.init(this._identifier);
    this._effectSources.addEffects(this._effects);
    this.initAsyncs();
    this.refresh();
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
