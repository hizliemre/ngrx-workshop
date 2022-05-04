import { createActionGroup } from '@ngrx/store';
import { emptyIdentifedProps, identifedProps } from 'src/app/ngrx-infra';
import { SalesDataWidgetData } from 'src/app/widget-data.model';

export const stateActions = createActionGroup({
  source: 'Sales Data Widget/API',
  events: {
    'Destroy': emptyIdentifedProps()
  }
})

export const getDataActions = createActionGroup({
  source: 'Sales Data Widget/API',
  events: {
    'Get Data': identifedProps<{ category: string }>(),
    'Get Data Success': identifedProps<{ data: SalesDataWidgetData }>(),
    'Get Data Fail': identifedProps<{ error: Error }>()
  }
})
