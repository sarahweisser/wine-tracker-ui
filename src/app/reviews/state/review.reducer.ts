import { UserReview } from "../review";
import * as AppState from '../../state/app.state';
import { createReducer, on } from "@ngrx/store";
import { ReviewApiActions, ReviewPageActions } from "./actions";

export interface State extends AppState.State {
    userReviews: ReviewState;
}

export interface ReviewState {
    userReviews: UserReview[];
    selectedUserReview: UserReview | null;
    error: string;
};

export const initialState: ReviewState = {
    userReviews: [],
    selectedUserReview: null,
    error: ''
};

export const reviewReducer = createReducer<ReviewState>(
    initialState,
    on(ReviewApiActions.getReviewsSuccess, (state, action): ReviewState => {
        return {
            ...state,
            userReviews: action.userReviews
        };
    }),
    on(ReviewPageActions.clearSelectedUserReview, (state): ReviewState => {
        return {
            ...state,
            selectedUserReview: null
        };
    }),
    on(ReviewPageActions.userReviewSelected, (state, action): ReviewState => {
        return {
            ...state,
            selectedUserReview: action.userReview
        };
    })
);