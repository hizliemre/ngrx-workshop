import { createReducer, on } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { getDataActions } from './actions';

export const SALES_DATA_WIDGET_FEATURE_KEY = 'salesDataWidget';
export interface SalesDataWidgetState {
  loading: boolean;
  loaded: boolean;
  data: SalesDataWidgetData[]
};

const initialState: SalesDataWidgetState = {
  loading: false,
  loaded: false,
  data: []
};

export const reducer = createReducer(
  initialState,
  on(getDataActions.getData, (state) => ({ ...state, loading: true })),
  on(getDataActions.getDataSuccess, (state, { data }) => ({ ...state, data, loading: false })),
  on(getDataActions.getDataFail, (state) => ({ ...state, loading: false })),
)
