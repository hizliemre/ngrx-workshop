import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { SalesDataWidgetState } from './reducer';

const selectFeatureState = (featureKey: string) => createFeatureSelector<SalesDataWidgetState>(featureKey);

const selectViewModel = (featureKey: string) => createSelector(selectFeatureState(featureKey), (state) => ({
  loading: state.loading,
  loaded: state.loaded,
  data: state.data as SalesDataWidgetData,
}));

export const salesDataWidgetSelectors = {
  selectViewModel
}

export type SalesDataWidgetViewModel = ReturnType<ReturnType<typeof selectViewModel>>;
