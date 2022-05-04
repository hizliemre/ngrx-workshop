import { Injectable, OnDestroy } from '@angular/core';
import { Actions, createEffect, EffectNotification, ofType, OnIdentifyEffects, OnRunEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, Observable, of, switchMap, takeUntil } from 'rxjs';
import { SalesDataService } from 'src/app/api/sales-data.service';
import { getDataActions, stateActions } from './actions';

@Injectable()
export class SalesDataWidgetEffects implements OnIdentifyEffects, OnRunEffects, OnDestroy {

  private _identifier: string;

  constructor(
    private readonly _store: Store,
    private readonly _actions$: Actions,
    private readonly _salesDataService: SalesDataService,
  ) { }


  init = (identifier: string) => this._identifier = identifier;

  $getData = createEffect(() => {
    return this._actions$.pipe(
      ofType(getDataActions.getData),
      filter(({ identifier }) => this._identifier == identifier),
      switchMap(({ category }) => this._salesDataService.getSalesData(category)
        .pipe(
          map((data) => getDataActions.getDataSuccess({ identifier: this._identifier, data })),
          catchError((error) => of(getDataActions.getDataFail({ identifier: this._identifier, error })))
        )
      )
    );
  });

  ngOnDestroy(): void {
    this._store.dispatch(stateActions.destroy({ identifier: this._identifier }));
  }

  ngrxOnIdentifyEffects(): string {
    return this._identifier;
  }

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return resolvedEffects$.pipe(
      takeUntil(this._actions$.pipe(ofType(stateActions.destroy)))
    );
  }

}
