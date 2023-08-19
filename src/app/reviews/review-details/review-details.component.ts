import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../state/review.reducer";
import { Router } from "@angular/router";

@Component({
    selector: 'app-review-details',
    templateUrl: './review-details.component.html'
})
export class UserReviewDetailsComponent implements OnInit {
    pageTitle = "Review Detail";

    ngOnInit(): void {
        console.log("INIT :: user review details comp");
    }

    constructor(
        private store: Store<State>,
        private router: Router
      ) { }
}