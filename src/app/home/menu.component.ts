import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, take } from "rxjs";
import { getUserLoggedIn } from "../user/state";
import { Store } from "@ngrx/store";
import { State } from "../user/state/user.reducer";
import { UserPageActions } from "../user/state/actions";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
  })
  export class MenuComponent implements OnInit {
    userLoggedIn$!: Observable<boolean>;
    loggedIn: boolean | null = null;
    
    ngOnInit(): void {
      console.log("INIT :: menu comp");
      this.userLoggedIn$ = this.store.select(getUserLoggedIn);
    }

    constructor(
      private store: Store<State>,
      private router: Router,
    ) {}
    
    pageTitle = 'Wine App';

    logout(): void {
      console.log("logout :: menu comp");
      // Is there a better way to get this value?
      this.userLoggedIn$.pipe(take(1)).subscribe(loggedIn => this.loggedIn = loggedIn);
      if (this.loggedIn === true) {
        this.store.dispatch(UserPageActions.toggleUserLoggedIn());
      }
      // clear current user
      this.store.dispatch(UserPageActions.clearCurrentUser());
      // clear any URL fragments on logout
      this.router.navigateByUrl('/welcome');
    }
  }