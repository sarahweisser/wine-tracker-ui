import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserReviewService } from "../review.service";
import { Injectable } from "@angular/core";
import { ReviewApiActions, ReviewPageActions } from "./actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";

@Injectable()
export class UserReviewEffects {

  constructor(private actions$: Actions, private userReviewService: UserReviewService) { }

  loadUserReviews$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ReviewPageActions.getUserReviews),
        mergeMap(() => this.userReviewService.getUserReviews()
          .pipe(
            tap(data => console.log(JSON.stringify(data))),
            map(userReviews => ReviewApiActions.getReviewsSuccess({ userReviews })),
            catchError(error => of(ReviewApiActions.getReviewsFailure({ error })))
          )
        )
      );
  });
}