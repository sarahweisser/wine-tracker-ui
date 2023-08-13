import { createAction, props } from "@ngrx/store";
import { User } from "../../user";

export const toggleUserLoggedIn = createAction(
    '[User Page] Toggle User Logged In'
);

export const toggleNewUserLogIn = createAction(
    '[User Page] Toggle New User Account'
);

export const toggleShowMenu = createAction(
    '[User Page] Toggle Show Menu'
);

export const setCurrentUser = createAction(
    '[User Page] Set Current User',
    props<{ currentUser: User }>()
);

export const getCurrentUser = createAction(
    '[User Page] Get Current User'
);

export const clearCurrentUser = createAction(
    '[User Page] Clear Current User'
);

export const getUserById = createAction(
    '[User Page] Get User By Id',
    props<{ user: User }>()
);

export const createUser = createAction(
    '[User Page] Create User',
    props<{ newUser: User }>()
);

export const loginUser = createAction(
    '[User Page] Login User',
    props<{ user: User }>()
);