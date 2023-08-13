import { createAction, props } from "@ngrx/store";
import { UserReview } from "../../review";

export const getReviewsSuccess = createAction(
    '[Review Page] Load Reviews Success',
    props<{ userReviews: UserReview[] }>()
);

export const getReviewsFailure = createAction(
    '[Review Page] Load Reviews Failure',
    props<{ error: string }>()
);