import { createSelector } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { salesDataWidgetFeature } from './reducer';

const selectViewModel = createSelector(
  salesDataWidgetFeature.selectLoading,
  salesDataWidgetFeature.selectLoaded,
  salesDataWidgetFeature.selectData, (loading, loaded, data) => ({
    loading,
    loaded,
    data: data as SalesDataWidgetData,
  })
);

// direkt state'in tamamını da select edebiliriz.
const selectViewModel2 = createSelector(
  salesDataWidgetFeature.selectSalesDataWidgetState,
  (state) => ({
    loading: state.loading,
    loaded: state.loaded,
    data: state.data as SalesDataWidgetData,
  })
);

export const salesDataWidgetSelectors = {
  selectViewModel
}

export type SalesDataWidgetViewModel = ReturnType<typeof selectViewModel>;
