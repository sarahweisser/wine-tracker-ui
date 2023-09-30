import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "./state/user.reducer";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserPageActions } from "./state/actions";
import { User, UserDto } from "./user";
import { Observable } from "rxjs";
import { getCurrentUser } from "./state";

@Component({
    templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
    pageTitle = "Create New Account";
    currentUser$!: Observable<User | null | undefined>;
    newUserDto!: UserDto;

    constructor(
        private store: Store<State>,
        private router: Router,
    ) { }

    ngOnInit(): void {
        console.log("INIT :: add user comp");
        this.currentUser$ = this.store.select(getCurrentUser);
        // ensure no user is selected
        this.store.dispatch(UserPageActions.clearCurrentUser());
       
    }

    addUser(addUserForm: NgForm): void {
        console.log("add user");
        if (addUserForm && addUserForm.valid) {
            const userName = addUserForm.form.value.userName;
            const userPassword = addUserForm.form.value.userPassword;
            const isAdmin = addUserForm.form.value.isAdmin;
            // TODO validate data for security
            this.newUserDto = {
                user: {
                    userName: userName,
                    userPassword: userPassword,
                    isAdmin: isAdmin
                },
                error: null
            }
            console.log("add user 3 " + JSON.stringify(this.newUserDto));
            this.store.dispatch(UserPageActions.createUser({ newUserDto: this.newUserDto }));
            this.store.dispatch(UserPageActions.setCurrentUser({ currentUserDto: this.newUserDto }));

        }
        this.store.dispatch(UserPageActions.toggleNewUserLogIn());
        this.store.dispatch(UserPageActions.toggleUserLoggedIn());  
  
        this.router.navigate(['welcome']);
    }

    cancel(): void {
        this.store.dispatch(UserPageActions.toggleNewUserLogIn());
        this.router.navigate(['login']);
    }
}
