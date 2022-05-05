import { Inject, InjectFlags, Injector } from '@angular/core';
import { Actions, EffectNotification, EffectSources, ofType, OnIdentifyEffects, OnRunEffects } from '@ngrx/effects';
import { Action, ActionCreatorProps, ReducerManager, UPDATE } from '@ngrx/store';
import { ActionCreator, ActionReducer, FunctionWithParametersType, NotAllowedInPropsCheck } from '@ngrx/store/src/models';
import { filter, Observable, pipe, takeUntil, UnaryFunction } from 'rxjs';

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

export type IdentifiedAction = Action & { identifier: string };

export abstract class IdentifiedEffects implements OnIdentifyEffects, OnRunEffects {

  protected identifier: string;
  private _destroyAction: ActionCreator<string, FunctionWithParametersType<IdentifiedAction[], IdentifiedAction>>;

  constructor(public actions$: Actions) { }

  protected localOfType<T extends IdentifiedAction>(action: ActionCreator<string, FunctionWithParametersType<T[], T>>): UnaryFunction<Observable<Action>, Observable<T>> {
    return pipe(
      ofType(action),
      filter((action) => action.identifier === this.identifier)
    );
  }

  protected init(identifier: string, destroyAction: ActionCreator<string, FunctionWithParametersType<IdentifiedAction[], IdentifiedAction>>): void {
    this.identifier = identifier;
    this._destroyAction = destroyAction;

  }

  ngrxOnIdentifyEffects(): string {
    return this.identifier;
  }

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return resolvedEffects$.pipe(
      takeUntil(this.actions$.pipe(this.localOfType(this._destroyAction))),
    );
  }
}
