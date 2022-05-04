import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesDataWidgetState, SALES_DATA_WIDGET_FEATURE_KEY } from './reducer';

const selectFeatureState = createFeatureSelector<SalesDataWidgetState>(SALES_DATA_WIDGET_FEATURE_KEY)
const selectLoading = createSelector(selectFeatureState, (state) => state.loading);
const selectLoaded = createSelector(selectFeatureState, (state) => state.loaded);
const selectData = createSelector(selectFeatureState, (state) => state.data);

export const salesDataWidgetSelectors = {
  selectLoading,
  selectLoaded,
  selectData
}
