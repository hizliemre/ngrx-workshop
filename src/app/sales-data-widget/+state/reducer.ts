import { createFeature, createReducer, on } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { getDataActions } from './actions';

const SALES_DATA_WIDGET_FEATURE_KEY = 'salesDataWidget';
export interface SalesDataWidgetState {
  initialized: boolean;
  loading: boolean;
  loaded: boolean;
  data: SalesDataWidgetData | null
};

const initialState: SalesDataWidgetState = {
  initialized: false,
  loading: false,
  loaded: false,
  data: null
};

export const salesDataWidgetFeature = createFeature({
  name: SALES_DATA_WIDGET_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(getDataActions.getData, (state) => ({ ...state, loading: true, loaded: false })),
    on(getDataActions.getDataSuccess, (state, { data }) => ({ ...state, data, loading: false, loaded: true })),
    on(getDataActions.getDataFail, (state) => ({ ...state, loading: false, loaded: false })),
  )
})

// @ngrx/component-store kullanılabilir!!!
