import { Inject, InjectFlags, Injector } from '@angular/core';
import { EffectSources } from '@ngrx/effects';
import { ActionCreatorProps, ReducerManager, UPDATE } from '@ngrx/store';
import { Action, ActionReducer, NotAllowedInPropsCheck } from '@ngrx/store/src/models';

export function emptyIdentifedProps(): ActionCreatorProps<{ identifier: string }> {
  return identifedProps();
}
export function identifedProps<P extends SafeProps, SafeProps = NotAllowedInPropsCheck<P>>(): ActionCreatorProps<P & { identifier: string }> {
  return { _as: 'props', _p: undefined! };
}

type IdentifiedAction = Action & { identifier: string };

const filterReducer = <T>(identifier: string, reducer: ActionReducer<T>) => (state: T, action: IdentifiedAction) => {
  if (action.type === UPDATE) return reducer(state, action);
  if (action.identifier && action.identifier === identifier) return reducer(state, action);
  return state;
}

export const featureKeyMap = (identifier: string, featureKey: string) => `${featureKey}_${identifier}`;

export abstract class ComponentState<T>  {

  abstract featureName: string;
  abstract reducer: ActionReducer<T, Action>;

  protected featureKey: string;
  protected identifier: string;

  private _reducerManager: ReducerManager;

  protected constructor(@Inject(Injector) private _injector: Injector) {
    this._reducerManager = this._injector.get(ReducerManager);
  }

  init(identifier: string) {
    this.identifier = identifier;
    this.featureKey = featureKeyMap(identifier, this.featureName);
    this._reducerManager.addReducer(this.featureKey, filterReducer(identifier, this.reducer));

    const effects = this._injector.get(IdentifiedEffects, null, InjectFlags.Self);
    if (effects !== null) {
      effects.init(identifier);
      const effectSources = this._injector.get(EffectSources);
      effectSources.addEffects(effects);
    }

  };

  destroy(): void {
    this._reducerManager.removeReducer(this.featureKey);
  }

}

export abstract class IdentifiedEffects {
  abstract init(identifier: string): void
}
