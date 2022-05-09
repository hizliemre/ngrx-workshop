import { ActionCreatorProps, UPDATE } from '@ngrx/store';
import { Action, ActionReducer, NotAllowedInPropsCheck } from '@ngrx/store/src/models';

export function emptyIdentifedProps(): ActionCreatorProps<{ identifier: string }> {
  return identifedProps();
}
export function identifedProps<P extends SafeProps, SafeProps = NotAllowedInPropsCheck<P>>(): ActionCreatorProps<P & { identifier: string }> {
  return { _as: 'props', _p: undefined! };
}

type IdentifiedAction = Action & { identifier: string };

export const filterReducer = <T>(identifier: string, reducer: ActionReducer<T>) => (state: T, action: IdentifiedAction) => {
  if (action.type === UPDATE) return reducer(state, action);
  if (action.identifier && action.identifier === identifier) return reducer(state, action);
  return state;
}
