import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { UserReviewListComponent } from "./review-list/review-list.component";
import { UserReviewShellComponent } from "./review-shell/review-shell.component";
import { reviewReducer } from "./state/review.reducer";
import { UserReviewEffects } from "./state/review.effects";
import { EffectsModule } from "@ngrx/effects";
import { EditUserReviewComponent } from "./edit-review/edit-review.component";
import { UserReviewDetailsComponent } from "./review-details/review-details.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UserReviewShellComponent },
      { path: ':id', component: UserReviewDetailsComponent },
      { path: ':id/edit', component: EditUserReviewComponent }
    ]),
    StoreModule.forFeature('userReviews', reviewReducer),
    EffectsModule.forFeature([UserReviewEffects])
  ],
  declarations: [
      UserReviewShellComponent,
      UserReviewListComponent,
      EditUserReviewComponent,
      UserReviewDetailsComponent
    ]
})
export class UserReviewModule { }