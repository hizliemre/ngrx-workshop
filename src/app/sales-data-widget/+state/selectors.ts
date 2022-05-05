import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { SalesDataWidgetState, SALES_DATA_WIDGET_FEATURE_KEY } from './reducer';

const selectFeatureState = (identifier: string) => createFeatureSelector<SalesDataWidgetState>(SALES_DATA_WIDGET_FEATURE_KEY(identifier))
const selectViewModel = (identifier: string) => createSelector(selectFeatureState(identifier), (state) => ({
  loading: state.loading,
  loaded: state.loaded,
  data: state.data as SalesDataWidgetData,
}));

export const salesDataWidgetSelectors = {
  selectViewModel
}

export type SalesDataWidgetViewModel = ReturnType<ReturnType<typeof selectViewModel>>;
