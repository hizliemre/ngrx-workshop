import { createReducer, on } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { getDataActions } from './actions';

export const SALES_DATA_WIDGET_FEATURE_KEY = 'salesDataWidget'
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
