import { createSelector } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';
import { salesDataWidgetFeature } from './reducer';

const featureCreator = (identifier: string) => salesDataWidgetFeature(identifier);

const selectViewModel = (identifier: string) => createSelector(
  featureCreator(identifier).selectLoading,
  featureCreator(identifier).selectLoaded,
  featureCreator(identifier).selectData, (loading, loaded, data) => ({
    loading,
    loaded,
    data: data as SalesDataWidgetData,
  })
);

// direkt state'in tamamını da select edebiliriz.
// const selectViewModel2 = (identifier: string) => createSelector(
//   featureCreator(identifier).selectSalesDataWidgetState,
//   (state) => ({
//     loading: state.loading,
//     loaded: state.loaded,
//     data: state.data as SalesDataWidgetData,
//   })
// );

export const salesDataWidgetSelectors = {
  selectViewModel
}

export type SalesDataWidgetViewModel = ReturnType<ReturnType<typeof selectViewModel>>;
