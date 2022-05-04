import { createActionGroup, props } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';

export const getDataActions = createActionGroup({
  source: 'Sales Data Widget/API',
  events: {
    'Get Data': props<{ identifier: string, category: string }>(),
    'Get Data Success': props<{ identifier: string, data: SalesDataWidgetData }>(),
    'Get Data Fail': props<{ identifier: string, error: Error }>()
  }
})
