import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../state/review.reducer";

@Component({
    templateUrl: './review-shell.component.html'
})
export class UserReviewShellComponent implements OnInit {
    ngOnInit(): void {
        console.log("INIT :: user review shell comp");
    }

    constructor(
        private store: Store<State>,
      ) { }
      
}