import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../state/review.reducer";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IWine } from "src/app/wine/wine";
import { getSelectedWine } from "src/app/wine/state";

@Component({
    selector: 'app-review-details',
    templateUrl: './review-details.component.html'
})
export class UserReviewDetailsComponent implements OnInit {
    pageTitle = "Review Detail";
    selectedWine$!: Observable<IWine | null>;
    // selectedWineDetails!: IWine | null;
    // TODO remove this hardcoded data
    selectedWineDetails = {
        "wineId": 1,
        "wineName": "Wine_1",
        "wineryName": "Winery_1",
        "vintage": "2020"
    }
    ngOnInit(): void {
        console.log("INIT :: user review details comp");
        this.selectedWine$ = this.store.select(getSelectedWine);
        //this.selectedWine$.pipe().subscribe(wine => this.selectedWineDetails = wine);
    }

    constructor(
        private store: Store<State>,
        private router: Router
      ) { }
}