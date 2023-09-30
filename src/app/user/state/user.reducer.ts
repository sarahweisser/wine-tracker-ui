import { createReducer, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { UserApiActions, UserPageActions } from "./actions";
import { UserDto } from "../user";

export interface State extends AppState.State {
    users: UserState;
};


export interface UserState {
    userDto: UserDto | null;
    userLoggedIn: boolean;
    newUserLogin: boolean;
    showMenu: boolean;
    
};

const initialState: UserState = {
    userDto: null,
    userLoggedIn: false,
    newUserLogin: false,
    showMenu: true,
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
            userDto: action.userDto
        };
    }),
    on(UserApiActions.getUserByIdFailure, (state, action): UserState => {
        return {
            ...state,
            userDto: action.errorDto
        };
    }),
    on(UserPageActions.clearCurrentUser, (state): UserState => {
        return {
            ...state,
            userDto: {
                user : null,
                error: null
            }
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
            userDto: action.currentUserDto
        };
    }),
    on(UserApiActions.createUserSuccess, (state, action): UserState => {
        return {
            ...state,
            userDto: action.userDto
        };
    }),
    on(UserApiActions.createUserFailure, (state, action): UserState => {
        return {
            ...state,
            userDto: action.errorDto
        };
    }),
    on(UserApiActions.loginUserSuccess, (state, action): UserState => {
        console.log("in reducer login: ");
        console.log(typeof(action.userDto.error));
        console.log(action.userDto?.user?.isAdmin);
        return {
            ...state,
            userDto: action.userDto,
            userLoggedIn: true
        };
    }),
    on(UserApiActions.loginUserFailure, (state, action): UserState => {
        console.log("in reducer error: ");
        console.log(typeof(action.errorDto));
        console.log("error " + action.errorDto);
        return {
            ...state,
            userDto: action.errorDto,
            userLoggedIn: false
        };
    })
);
    