import { SalesDataWidgetData } from 'src/app/widget-data.model';

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
