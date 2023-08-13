import { createAction, props } from "@ngrx/store";
import { IWine } from "../../wine";

export const wineSelected = createAction(
    '[Wine Page] Wine Selected',
    props<{ wine: IWine }>()
);

export const clearSelectedWine = createAction(
    '[Wine Page] Clear Wine Selection'
);

export const loadWines = createAction(
    '[Wine Page] Load Wines'
);

export const getWineById = createAction(
    '[Wine Page] Get Wine By ID',
    props<{ wine: IWine }>()
);