import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ComponentState } from 'src/app/ngrx-infra';
import { getDataActions } from './actions';
import { reducer, SalesDataWidgetState, SALES_DATA_WIDGET_FEATURE_KEY } from './reducer';

@Injectable()
export class SalesDataWidgetComponentState extends ComponentState<SalesDataWidgetState> implements OnDestroy {

  featureName = SALES_DATA_WIDGET_FEATURE_KEY;
  reducer = reducer;

  constructor(
    injector: Injector,
    private _store: Store,
  ) { super(injector) }

  refresh(category: string): void {
    this._store.dispatch(getDataActions.getData({ identifier: this.identifier, category }));
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
