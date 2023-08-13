import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './home/shell.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { WelcomeComponent } from './home/welcome.component';
import { UserReviewShellComponent } from './reviews/review-shell/review-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'userReviewList',
        loadChildren: () =>
          import('./reviews/review.module').then(m => m.UserReviewModule)
      },
      {
        path: 'wines',
        loadChildren: () =>
          import('./wine/wine.module').then(m => m.WineModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
