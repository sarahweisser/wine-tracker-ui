import { createAction, props } from "@ngrx/store";
import { User } from "../../user";

export const getUserByIdSuccess = createAction(
    '[User API] Get User by ID Success',
    props<{user: User}>()
);

export const getUserByIdFailure = createAction(
    '[User API] Get User by ID Failure',
    props<{error: string}>()
);

export const createUserSuccess = createAction(
    '[User API] Create User Success',
    props<{user: User}>()
);

export const createUserFailure = createAction(
    '[User API] Create User Failure',
    props<{error: string}>()
);

export const loginUserSuccess = createAction(
    '[User API] Login User Success',
    props<{user: User}>()
);

export const loginUserFailure = createAction(
    '[User API] Login User Failure',
    props<{error: string}>()
);
