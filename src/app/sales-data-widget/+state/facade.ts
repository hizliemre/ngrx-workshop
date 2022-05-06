import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ComponentState } from 'src/app/ngrx-infra';
import { getDataActions, stateActions } from './actions';
import { reducer, SalesDataWidgetState, SALES_DATA_WIDGET_FEATURE_KEY } from './reducer';
import { salesDataWidgetSelectors, SalesDataWidgetViewModel } from './selectors';

@Injectable()
export class SalesDataWidgetComponentState extends ComponentState<SalesDataWidgetState> implements OnDestroy {

  featureName = SALES_DATA_WIDGET_FEATURE_KEY;
  reducer = reducer;
  destroyAction = stateActions.destroy;

  viewModel$: Observable<SalesDataWidgetViewModel>;

  constructor(
    injector: Injector,
    private _store: Store
  ) { super(injector) }

  setSelectors(): void {
    this.viewModel$ = this._store.select(salesDataWidgetSelectors.selectViewModel(this.featureKey));
  }

  refresh(category: string): void {
    this._store.dispatch(getDataActions.getData({ identifier: this.identifier, category }));
  }

  // bunu yazmaya zorlamıyor! unutulursa effect'ler ve reducer memory-leak yaratır.
  ngOnDestroy(): void {
    this.destroy();
  }

}
