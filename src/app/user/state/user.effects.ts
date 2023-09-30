import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiActions, UserPageActions } from './actions';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { catchError, concatMap, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService) { }

  getUserById$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.getUserById),
        mergeMap((action) => this.userService.getUserById(action.userDto)
          .pipe(
            map(userDto => UserApiActions.getUserByIdSuccess({ userDto: userDto })),
            catchError(error => of(UserApiActions.getUserByIdFailure({ errorDto: error })))
          )
        )
      );
  });

  createUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.createUser),
        concatMap((action) => this.userService.createUser(action.newUserDto)
          .pipe(
            tap(data => console.log("HEY: " + JSON.stringify(data))),
            map(userDto => UserApiActions.createUserSuccess({ userDto })),
            catchError(errorDto => of(UserApiActions.createUserFailure({ errorDto })))
          )
        )
      );
  });

  loginUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.loginUser),
        concatMap((action) => this.userService.loginUser(action.userDto)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            map(userDto => UserApiActions.loginUserSuccess({ userDto })),
            catchError(errorDto => of(UserApiActions.loginUserFailure({ errorDto })))
          )
        )
      );
  });

  // TODO DELETE, UPDATE
}