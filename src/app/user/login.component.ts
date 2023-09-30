import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "./state/user.reducer";
import { Observable, take } from "rxjs";
import { getCurrentUser, getError, getNewUserLogin, getShowMenu, getUserLoggedIn } from "./state";
import { UserPageActions } from "./state/actions";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User, UserDto } from "./user";

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  userLoggedIn$!: Observable<boolean>;
  newUserLogin$!: Observable<boolean>;
  newUserAccount!: boolean;
  user!: User;
  currentUser$!: Observable<User | null | undefined>;
  currentUser!: User | null;
  userDto: UserDto | null | undefined;
  showMenu$!: Observable<boolean>;
  error$!: Observable<any | null | undefined>;
  error!: string | null | undefined;
  
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
    this.error$ = this.store.select(getError);
    this.error$.pipe(take(1)).subscribe(err => this.error = err);
    this.store.dispatch(UserPageActions.clearCurrentUser());
  }


  async login(loginForm: NgForm): Promise<void> {
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

      this.userDto = {
        user: this.user,
        error: null
      } as UserDto

      this.store.dispatch(UserPageActions.loginUser({ userDto: this.userDto }));
      console.log("error message below");
      this.error$.pipe().subscribe(err => this.error = err);
      let error1 = await this.error;
      console.log("error message " + error1);
      // TODO handle validation and incorrect password errors from API
      if (error1) {
        console.log("error message 1");
        console.log("error message 1: " + error1);
        this.router.navigate(['login']);
      } else {
        console.log("error message 2");
        this.router.navigate(['welcome']);
      }
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