import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';


export const stateActions = createActionGroup({
  source: 'Sales Data Widget/STATE',
  events: {
    'Initialize': props<{ category: string }>(),
    'Initialized': emptyProps(),
    'Destroy': emptyProps(),
  }
})

export const getDataActions = createActionGroup({
  source: 'Sales Data Widget/API',
  events: {
    'Get Data': props<{ category: string }>(),
    'Get Data Success': props<{ data: SalesDataWidgetData[] }>(),
    'Get Data Fail': props<{ error: Error }>()
  }
})
