import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as AppState from '../../state/app.state';
import { WineState } from "./wine.reducer";

export interface State extends AppState.State {
    wines: WineState
}

const getWineFeatureState = createFeatureSelector<WineState>('wines');

export const getSelectedWineId = createSelector(
    getWineFeatureState,
    state => state.wineSelected?.wineId
);

export const getWineList = createSelector(
    getWineFeatureState,
    state => state.wineList
);

export const getSelectedWine = createSelector(
    getWineFeatureState,
    state => state.wineSelected
);