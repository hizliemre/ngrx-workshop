import { Inject, InjectFlags, Injector } from '@angular/core';
import { EffectSources } from '@ngrx/effects';
import { Action, ActionCreatorProps, ReducerManager, UPDATE } from '@ngrx/store';
import { ActionReducer, NotAllowedInPropsCheck } from '@ngrx/store/src/models';

export function emptyIdentifedProps(): ActionCreatorProps<{ identifier: string }> {
  return identifedProps();
}

export function identifedProps<P extends SafeProps, SafeProps = NotAllowedInPropsCheck<P>>(): ActionCreatorProps<P & { identifier: string }> {
  return { _as: 'props', _p: undefined! };
}

export const filterReducer = <T>(identifier: string, reducer: ActionReducer<T>) => (state: T, action: any) => {
  if (action.type === UPDATE) return reducer(state, action);
  if (action.identifier && action.identifier === identifier) return reducer(state, action);
  return state;
}

export const featureKeyMap = (identifier: string, featureKey: string) => `${featureKey}_${identifier}`;


export abstract class ComponentEffects {
  abstract init(identifier: string): void;
}


export function Test() {
  return function decorator(target: object) {
    console.log(target);
  }
}

@Test()
export abstract class ComponentState<T>  {

  protected featureKey: string;
  protected identifier: string;
  private _reducerManager: ReducerManager;

  protected constructor(@Inject(Injector) private _injector: Injector) {
    this._reducerManager = this._injector.get(ReducerManager);
  }

  init(identifier: string, featureKey: string, reducer: ActionReducer<T, Action>) {

    this.identifier = identifier;
    this.featureKey = featureKeyMap(identifier, featureKey);
    this._reducerManager.addReducer(this.featureKey, filterReducer(identifier, reducer));

    const effects = this._injector.get(ComponentEffects, null, InjectFlags.Self);
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
