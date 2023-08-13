import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { UserReviewListComponent } from "./review-list/review-list.component";
import { UserReviewShellComponent } from "./review-shell/review-shell.component";
import { reviewReducer } from "./state/review.reducer";
import { UserReviewEffects } from "./state/review.effects";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UserReviewShellComponent }
    ]),
    StoreModule.forFeature('userReviews', reviewReducer),
    EffectsModule.forFeature([UserReviewEffects])
  ],
  declarations: [
      UserReviewShellComponent,
      UserReviewListComponent
    ]
})
export class UserReviewModule { }