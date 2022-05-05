import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { SalesDataService } from 'src/app/api/sales-data.service';
import { IdentifiedEffects } from 'src/app/ngrx-infra';
import { getDataActions } from './actions';

@Injectable()
export class SalesDataWidgetEffects extends IdentifiedEffects {

  constructor(
    private readonly _actions$: Actions,
    private readonly _salesDataService: SalesDataService,
  ) { super(_actions$) }

  $getData = createEffect(() => {
    return this._actions$.pipe(
      ofType(getDataActions.getData),
      filter(({ identifier }) => this.identifier == identifier),
      switchMap(({ category }) => this._salesDataService.getSalesData(category)
        .pipe(
          map((data) => getDataActions.getDataSuccess({ identifier: this.identifier, data })),
          catchError((error) => of(getDataActions.getDataFail({ identifier: this.identifier, error })))
        )
      )
    );
  });

}
