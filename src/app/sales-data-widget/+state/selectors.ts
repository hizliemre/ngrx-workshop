import { createSelector } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { salesDataWidgetFeature } from './reducer';

const selectViewModel = createSelector(
  salesDataWidgetFeature.selectLoading,
  salesDataWidgetFeature.selectLoaded,
  salesDataWidgetFeature.selectData, (loading, loaded, data) => ({ loading, loaded, data: data as SalesDataWidgetData, })
);

export const salesDataWidgetSelectors = {
  selectViewModel
}

export type SalesDataWidgetViewModel = ReturnType<typeof selectViewModel>;
