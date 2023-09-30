import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { getCurrentUser, getUserLoggedIn } from '../user/state';
import { Store } from '@ngrx/store';
import { State } from '../user/state/user.reducer';
import { User } from '../user/user';
import { Router } from '@angular/router';

@Component({
    templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
    pageTitle = 'Welcome';
    userLoggedIn$!: Observable<boolean>;
    currentUser$!: Observable<User | null | undefined>;
    
    ngOnInit(): void {
      console.log("INIT :: welcome comp");
      this.userLoggedIn$ = this.store.select(getUserLoggedIn);
      this.currentUser$ = this.store.select(getCurrentUser);
    }

    constructor(
      private store: Store<State>,
      private router: Router
    ) {}
}