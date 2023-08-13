import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "../state/wine.reducer";
import { getSelectedWineId } from "../state";
import { getShowMenu, getUserLoggedIn } from "src/app/user/state";

@Component({
    templateUrl: './wine-shell.component.html',
})
export class WineShellComponent implements OnInit {
    selectedWineId$!: Observable<number | undefined>;
    userLoggedIn$!: Observable<boolean>;
    showMenu$!: Observable<boolean>;


    ngOnInit(): void {
        console.log("INIT :: wine shell comp");
        this.userLoggedIn$ = this.store.select(getUserLoggedIn);
        this.showMenu$ = this.store.select(getShowMenu);
        this.selectedWineId$ = this.store.select(getSelectedWineId);
    }

    constructor(
        private store: Store<State>,
    ) { }
}