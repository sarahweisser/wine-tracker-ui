import { NgModule } from "@angular/core";
import { WineEditComponent } from "./wine-edit/wine-edit.component";
import { WineListComponent } from "./wine-list/wine-list.component";
import { RouterModule } from "@angular/router";
import { WineShellComponent } from "./wine-shell/wine-shell.component";
import { StoreModule } from "@ngrx/store";
import { wineReducer } from "./state/wine.reducer";
import { WineDetailsComponent } from "./wine-details/wine-details.component";
import { EffectsModule } from "@ngrx/effects";
import { WineEffects } from "./state/wine.effects";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: '', component: WineShellComponent },
            { path: ':id', component: WineDetailsComponent },
            { path: ':id/edit', component: WineEditComponent }
        ]),

        StoreModule.forFeature('wines', wineReducer),
        EffectsModule.forFeature([WineEffects])
    ],
    declarations: [
        WineShellComponent,
        WineEditComponent,
        WineListComponent,
        WineDetailsComponent
    ]
})
export class WineModule {}