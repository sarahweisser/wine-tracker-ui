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
        mergeMap((action) => this.userService.getUserById(action.user)
          .pipe(
            map(user => UserApiActions.getUserByIdSuccess({ user })),
            catchError(error => of(UserApiActions.getUserByIdFailure({ error })))
          )
        )
      );
  });

  createUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.createUser),
        concatMap((action) => this.userService.createUser(action.newUser)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            map(user => UserApiActions.createUserSuccess({ user })),
            catchError(error => of(UserApiActions.createUserFailure({ error })))
          )
        )
      );
  });

  loginUser$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.loginUser),
        concatMap((action) => this.userService.loginUser(action.user)
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            map(user => UserApiActions.loginUserSuccess({ user })),
            catchError(error => of(UserApiActions.loginUserFailure({ error })))
          )
        )
      );
  });

  // TODO DELETE, UPDATE
}