import { createReducer, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { UserApiActions, UserPageActions } from "./actions";
import { User } from "../user";

export interface State extends AppState.State {
    users: UserState;
};

export interface UserState {
    currentUser: User | null;
    userLoggedIn: boolean;
    newUserLogin: boolean;
    showMenu: boolean;
    error: string;
};

const initialState: UserState = {
    currentUser: null,
    userLoggedIn: false,
    newUserLogin: false,
    showMenu: true,
    error: '',
};

export const userReducer = createReducer<UserState>(
    initialState,
    on(UserPageActions.toggleUserLoggedIn, (state): UserState => {
        return {
            ...state,
            userLoggedIn: !state.userLoggedIn
        };
    }),
    on(UserPageActions.toggleNewUserLogIn, (state): UserState => {
        return {
            ...state,
            newUserLogin: !state.newUserLogin
        };
    }),
    on(UserApiActions.getUserByIdSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.user
        };
    }),
    on(UserApiActions.getUserByIdFailure, (state, action): UserState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(UserPageActions.clearCurrentUser, (state): UserState => {
        return {
            ...state,
            currentUser: null
        };
    }),
    on(UserPageActions.toggleShowMenu, (state): UserState => {
        return {
            ...state,
            showMenu: !state.showMenu
        };
    }),
    on(UserPageActions.setCurrentUser, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.currentUser
        };
    }),
    on(UserApiActions.createUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.user,
            error: ''
        };
    }),
    on(UserApiActions.createUserFailure, (state, action): UserState => {
        return {
            ...state,
            currentUser: null,
            error: action.error
        };
    }),
    on(UserApiActions.loginUserSuccess, (state, action): UserState => {
        return {
            ...state,
            currentUser: action.user,
            error: ''
        };
    }),
    on(UserApiActions.loginUserFailure, (state, action): UserState => {
        return {
            ...state,
            currentUser: null,
            userLoggedIn: false,
            error: action.error
        };
    
    })
);
    