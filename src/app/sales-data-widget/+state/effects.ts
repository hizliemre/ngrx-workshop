import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnIdentifyEffects } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SalesDataService } from 'src/app/api/sales-data.service';
import { getDataActions } from './actions';

@Injectable()
export class SalesDataWidgetEffects implements OnIdentifyEffects {

  private _identifier: string;

  constructor(
    private readonly _actions$: Actions,
    private readonly _salesDataService: SalesDataService,
  ) { }

  init = (identifier: string) => this._identifier = identifier;

  $getData = createEffect(() => {
    return this._actions$.pipe(
      ofType(getDataActions.getData),
      switchMap(({ category }) => this._salesDataService.getSalesData(category)
        .pipe(
          map((data) => getDataActions.getDataSuccess({ data })),
          catchError((error) => of(getDataActions.getDataFail({ error })))
        )
      )
    );
  });

  ngrxOnIdentifyEffects(): string {
    return this._identifier;
  }

}
