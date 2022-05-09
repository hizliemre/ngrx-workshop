import { Injectable, Injector, OnDestroy } from '@angular/core';
import { ComponentState } from 'src/app/ngrx-infra';
import { getDataActions, stateActions } from './actions';
import { reducer, SalesDataWidgetState, SALES_DATA_WIDGET_FEATURE_KEY } from './reducer';

@Injectable()
export class SalesDataWidgetComponentState extends ComponentState<SalesDataWidgetState> implements OnDestroy {

  featureName = SALES_DATA_WIDGET_FEATURE_KEY;
  reducer = reducer;
  destroyAction = stateActions.destroy;

  constructor(injector: Injector) { super(injector) }

  refresh(category: string): void {
    this.store.dispatch(getDataActions.getData({ identifier: this.identifier, category }));
  }

  ngOnDestroy(): void {
    this.destroy();
  }

}
