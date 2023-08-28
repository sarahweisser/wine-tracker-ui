import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IWine } from "src/app/wine/wine";
import { Router } from "@angular/router";
import { State } from "../state/review.reducer";
import { getSelectedWine } from "src/app/wine/state";

@Component({
    selector: 'app-edit-review',
    templateUrl: './edit-review.component.html'
})
export class EditUserReviewComponent implements OnInit {
    pageTitle = "Edit review";
    selectedWine$!: Observable<IWine | null>;
    selectedWineDetails!: IWine | null;

    ngOnInit(): void {
        console.log("INIT :: edit user review comp");
        this.selectedWine$ = this.store.select(getSelectedWine);
        this.selectedWine$.pipe().subscribe(wine => this.selectedWineDetails = wine);
    }

    constructor(
        private store: Store<State>,
        private router: Router
    ) { }
}