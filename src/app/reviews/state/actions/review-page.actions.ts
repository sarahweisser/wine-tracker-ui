import { createAction, props } from "@ngrx/store";
import { UserReview } from "../../review";

export const getUserReviews = createAction(
    '[Review Page] Load Reviews'
)

export const clearSelectedUserReview = createAction(
    '[Review Page] Clear Review Selection'
);

export const userReviewSelected = createAction(
    '[Review Page] Review Selected',
    props<{ userReview: UserReview }>()
);