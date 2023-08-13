import { UserReview } from "../review";
import * as AppState from '../../state/app.state';
import { createReducer, on } from "@ngrx/store";
import { ReviewApiActions } from "./actions";

export interface State extends AppState.State {
    userReviews: ReviewState;
}

export interface ReviewState {
    userReviews: UserReview[];
    error: string;
};

export const initialState: ReviewState = {
    userReviews: [],
    error: ''
};

export const reviewReducer = createReducer<ReviewState>(
    initialState,
    on(ReviewApiActions.getReviewsSuccess, (state, action): ReviewState => {
        return {
            ...state,
            userReviews: action.userReviews
        };
    })
);