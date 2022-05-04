import { createAction, props } from '@ngrx/store';
import { SalesDataWidgetData } from 'src/app/widget-data.model';

export const initialize = createAction('[Sales Data Widget/STATE] Initialize', props<{ category: string }>());
export const initialized = createAction('[Sales Data Widget/STATE] Initialized');
export const destroy = createAction('[Sales Data Widget/STATE] Destroy');

export const getData = createAction('[Sales Data Widget/API] Get Data', props<{ category: string }>());
export const getDataSuccess = createAction('[Sales Data Widget/API] Get Data Success', props<{ data: SalesDataWidgetData[] }>());
export const getDataFail = createAction('[Sales Data Widget/API] Get Data Fail', props<{ error: Error }>());
