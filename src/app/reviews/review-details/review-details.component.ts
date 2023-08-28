import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../state/review.reducer";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IWine } from "src/app/wine/wine";
import { getSelectedWine } from "src/app/wine/state";
import { UserReview } from "../review";
import { getSelectedUserReview } from "../state";

@Component({
    selector: 'app-review-details',
    templateUrl: './review-details.component.html'
})
export class UserReviewDetailsComponent implements OnInit {
    pageTitle = "Review Detail";
    selectedWine$!: Observable<IWine | null>;
    selectedReview$!: Observable<UserReview | null>;
    selectedReviewDetails!: UserReview | null;


    ngOnInit(): void {
        console.log("INIT :: user review details comp");
        this.selectedWine$ = this.store.select(getSelectedWine);
        this.selectedReview$ = this.store.select(getSelectedUserReview);
    }

    constructor(
        private store: Store<State>,
        private router: Router
      ) { }
}