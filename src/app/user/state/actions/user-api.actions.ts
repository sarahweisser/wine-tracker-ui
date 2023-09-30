import { createAction, props } from "@ngrx/store";
import { UserDto } from "../../user";

export const getUserByIdSuccess = createAction(
    '[User API] Get User by ID Success',
    props<{userDto: UserDto}>()
);

export const getUserByIdFailure = createAction(
    '[User API] Get User by ID Failure',
    props<{errorDto: UserDto}>()
);

export const createUserSuccess = createAction(
    '[User API] Create User Success',
    props<{userDto: UserDto}>()
);

export const createUserFailure = createAction(
    '[User API] Create User Failure',
    props<{errorDto: UserDto}>()
);

export const loginUserSuccess = createAction(
    '[User API] Login User Success',
    props<{userDto: UserDto}>()
);

export const loginUserFailure = createAction(
    '[User API] Login User Failure',
    props<{errorDto: UserDto}>()
);
