import { Injectable } from '@angular/core';

import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { WineService } from '../wine.service';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WineApiActions, WinePageActions } from './actions';

@Injectable()
export class WineEffects {

  constructor(private actions$: Actions, private wineService: WineService) { }

  loadWines$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(WinePageActions.loadWines),
        mergeMap(() => this.wineService.getWines()
          .pipe(
            map(wineList => WineApiActions.getWineListSuccess({ wineList })),
            catchError(error => of(WineApiActions.getWineListFailure({ error })))
          )
        )
      );
  });

  getWineById$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(WinePageActions.getWineById),
        mergeMap((action) => this.wineService.getWineById(action.wine)
          .pipe(
            map(wine => WineApiActions.getWineByIdSuccess({ wine })),
            catchError(error => of(WineApiActions.getWineByIdFailure({ error })))
          )
        )
      );
  });

  // TODO CUD + submit new wine
}