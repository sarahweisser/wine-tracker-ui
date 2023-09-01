import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IWine } from "src/app/wine/wine";
import { ActivatedRoute, Router } from "@angular/router";
import { State } from "../state/review.reducer";
import { getSelectedWine } from "src/app/wine/state";

@Component({
    selector: 'app-edit-review',
    templateUrl: './edit-review.component.html'
})
export class EditUserReviewComponent implements OnInit {
    pageTitle = "Edit review";
    isExistingReview!: Boolean;
    

    ngOnInit(): void {
        console.log("INIT :: edit user review comp");
        let reviewId = this.route.snapshot.url.at(0)?.path;
        this.isExistingReview = reviewId !== "0";
        if (!this.isExistingReview) {
            this.pageTitle = "Add new review";
        }
    }

    constructor(
        private store: Store<State>,
        private router: Router,
        private route: ActivatedRoute
    ) { }
}