import { Component, OnInit } from "@angular/core";
import { UserReview } from "../review";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "../state/review.reducer";
import { getUserReviews } from "../state";
import { ReviewPageActions } from "../state/actions";

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html'
})
export class UserReviewListComponent implements OnInit {
  userReviewList$!: Observable<UserReview[]>; 
  pageTitle = "Reviews";

  ngOnInit(): void {
    console.log("INIT :: user review list comp");
    this.userReviewList$ = this.store.select(getUserReviews);
    this.store.dispatch(ReviewPageActions.getUserReviews());
  }

  constructor(
    private store: Store<State>,
    private router: Router
  ) { }

  addNewUserReview(): void {
    this.router.navigate(['/reviews/0/edit']);
  }
}