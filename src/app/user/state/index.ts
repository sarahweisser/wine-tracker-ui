import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from './user.reducer';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
    users: UserState;
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getUserLoggedIn = createSelector(
    getUserFeatureState,
    state => state.userLoggedIn
);

export const getNewUserLogin = createSelector(
    getUserFeatureState,
    state => state.newUserLogin
);

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export const getShowMenu = createSelector(
    getUserFeatureState,
    state => state.showMenu
);