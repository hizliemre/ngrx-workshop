import { SalesDataWidgetData } from 'src/app/widget-data.model';

export interface SalesDataWidgetState {
  loading: boolean;
  loaded: boolean;
  data: SalesDataWidgetData;
};
