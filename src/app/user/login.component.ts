import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "./state/user.reducer";
import { Observable } from "rxjs";
import { getCurrentUser, getNewUserLogin, getShowMenu, getUserLoggedIn } from "./state";
import { UserPageActions } from "./state/actions";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from "./user";

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  userLoggedIn$!: Observable<boolean>;
  newUserLogin$!: Observable<boolean>;
  newUserAccount!: boolean;
  user!: User;
  currentUser$!: Observable<User | null>;
  showMenu$!: Observable<boolean>;

  constructor(
    private store: Store<State>,
    private router: Router,
  ) { }


  ngOnInit(): void {
    console.log("INIT :: login comp");
    this.userLoggedIn$ = this.store.select(getUserLoggedIn);
    this.newUserLogin$ = this.store.select(getNewUserLogin);
    this.currentUser$ = this.store.select(getCurrentUser);
    this.showMenu$ = this.store.select(getShowMenu);
    this.store.dispatch(UserPageActions.clearCurrentUser());
  }


  login(loginForm: NgForm): void {
    console.log("login");
    if (loginForm && loginForm.valid) {
      const formUserName = loginForm.form.value.userName;
      const formUserPassword = loginForm.form.value.userPassword;

      // TODO validate input
      console.log("Name: " + formUserName + " Pass: " + formUserPassword);
      this.user = {
        userName: formUserName,
        userPassword: formUserPassword
      } as User

      this.store.dispatch(UserPageActions.loginUser({ user: this.user }));

      // TODO handle validation and incorrect password errors from API

      this.store.dispatch(UserPageActions.toggleUserLoggedIn());
      this.store.dispatch(UserPageActions.setCurrentUser({ currentUser: this.user }));
      console.log("in login 4");

      this.router.navigate(['welcome']);
    }
  }

  showCreateAccount(): void {
    this.store.dispatch(UserPageActions.toggleNewUserLogIn());
    this.router.navigate(['createUser']);
  }

  cancel(): void {
    this.router.navigateByUrl('/welcome');
  }
}