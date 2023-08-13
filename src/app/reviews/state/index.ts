import { ReviewState } from "./review.reducer";
import * as AppState from '../../state/app.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface State extends AppState.State {
    userReviews: ReviewState;
}

const getUserReviewFeatureState = createFeatureSelector<ReviewState>('userReviews');

export const getUserReviews = createSelector(
    getUserReviewFeatureState,
    state => state.userReviews
);
