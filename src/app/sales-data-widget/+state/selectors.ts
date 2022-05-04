import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { SalesDataWidgetState, SALES_DATA_WIDGET_FEATURE_KEY } from './reducer';

const selectFeatureState = createFeatureSelector<SalesDataWidgetState>(SALES_DATA_WIDGET_FEATURE_KEY)
const selectLoading = createSelector(selectFeatureState, (state) => state.loading);
const selectLoaded = createSelector(selectFeatureState, (state) => state.loaded);
const selectData = createSelector(selectFeatureState, (state) => state.data);

const selectViewModel = createSelector(
  selectLoading,
  selectLoaded,
  selectData, (loading, loaded, data) => ({ loading, loaded, data: data as SalesDataWidgetData, }));

export const salesDataWidgetSelectors = {
  selectViewModel
}

export type SalesDataWidgetViewModel = ReturnType<typeof selectViewModel>;
