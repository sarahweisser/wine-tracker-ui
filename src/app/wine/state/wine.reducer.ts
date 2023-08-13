import { createReducer, on } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { WineApiActions, WinePageActions } from "./actions";
import { IWine } from "../wine";

export interface State extends AppState.State {
    wines: WineState;
};

export interface WineState {
    wineSelected: IWine | null;
    wineList: IWine[];
    error: string;
};

const initialState: WineState = {
    wineSelected: null,
    wineList: [],
    error: ''
}

export const wineReducer = createReducer<WineState>(
    initialState,
    on(WinePageActions.wineSelected, (state, action): WineState => {
        return {
            ...state,
            wineSelected: action.wine
        };
    }),
    on(WinePageActions.clearSelectedWine, (state): WineState => {
        return {
            ...state,
            wineSelected: null
        };
    }),
    on(WineApiActions.getWineByIdSuccess, (state, action): WineState => {
        return {
            ...state,
            wineSelected: action.wine,
            error: ''
        };
    }),
    on(WineApiActions.getWineByIdFailure, (state, action): WineState => {
        return {
            ...state,
            error: action.error
        };
    }),
    on(WineApiActions.getWineListSuccess, (state, action): WineState => {
        return {
            ...state,
            wineList: action.wineList,
            error: ''
        }
    })
);