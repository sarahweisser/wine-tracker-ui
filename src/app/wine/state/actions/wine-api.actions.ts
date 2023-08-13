import { createAction, props } from "@ngrx/store";
import { IWine } from "../../wine";

export const getWineListSuccess = createAction(
    '[Wine API] Get Wine List Success',
    props<{ wineList: IWine[] }>()
);

export const getWineListFailure = createAction(
    '[Wine API] Get Wine List Failure',
    props<{ error: string }>()
);

export const getWineByIdSuccess = createAction(
    '[Wine API] Get Wine By ID Success',
    props<{ wine: IWine }>()
);

export const getWineByIdFailure = createAction(
    '[Wine API] Get Wine By ID Failure',
    props<{ error: string }>()  
);
