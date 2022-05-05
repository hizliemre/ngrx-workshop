import { createReducer, on } from '@ngrx/store';
import { featureKeyMap } from 'src/app/ngrx-infra';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { getDataActions } from './actions';

const featureKey = 'salesDataWidget'
export const SALES_DATA_WIDGET_FEATURE_KEY = (identifier: string) => featureKeyMap(identifier, featureKey);
export interface SalesDataWidgetState {
  loading: boolean;
  loaded: boolean;
  data: SalesDataWidgetData | null
};

const initialState: SalesDataWidgetState = {
  loading: false,
  loaded: false,
  data: null
};

export const reducer = createReducer(
  initialState,
  on(getDataActions.getData, (state) => ({ ...state, loading: true, loaded: false })),
  on(getDataActions.getDataSuccess, (state, { data }) => ({ ...state, data, loading: false, loaded: true })),
  on(getDataActions.getDataFail, (state) => ({ ...state, loading: false, loaded: false })),
)

// @ngrx/component-store kullanılabilir!!!
