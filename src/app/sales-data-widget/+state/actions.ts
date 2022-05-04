import { createActionGroup, props } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';

export const getDataActions = createActionGroup({
  source: 'Sales Data Widget/API',
  events: {
    'Get Data': props<{ category: string }>(),
    'Get Data Success': props<{ data: SalesDataWidgetData[] }>(),
    'Get Data Fail': props<{ error: Error }>()
  }
})
