import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User, UserDto } from "./user";
import { Observable, catchError, of, tap, throwError } from "rxjs";
import { Store } from "@ngrx/store";
import { State } from "./state/user.reducer";
import { UserPageActions } from "./state/actions";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private baseUserUrl = `http://localhost:8080/api/v1/users`;
    private errorMessageString = '';

    constructor(private http: HttpClient, private store: Store<State>) { }

    createUser(userDto: UserDto): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log("in create " + JSON.stringify(userDto));
        return this.http.post<UserDto>(this.baseUserUrl, userDto.user, { headers })
            .pipe(
                tap(data => console.log('createUser: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    updateUser(userDto: UserDto): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.baseUserUrl + "/" + userDto?.user?.userId;
        console.log("in update " + JSON.stringify(userDto));
        return this.http.put<UserDto>(url, userDto?.user, { headers })
            .pipe(
                tap(data => console.log('update user: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    loginUser(userDto: UserDto): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.baseUserUrl + "/login";
        console.log('login user: ' + JSON.stringify(userDto));
        let errorMessage!: Observable<any>;
        let response = this.http.post<UserDto>(url, userDto.user, { headers })
            .pipe(
                tap(data => console.log('login user 2: ' + JSON.stringify(data))),
                catchError(err => errorMessage = this.handleError(err))
            );
        return response;
    }

    getUserById(userDto: UserDto): Observable<any> {
        const url = this.baseUserUrl + "/" + userDto?.user?.userId;
        return this.http.get<UserDto>(url)
            .pipe(
                tap(data => console.log('get user by id: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getUsers(): Observable<any> {
        return this.http.get<User[]>(this.baseUserUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    private handleError(err: string): any {
        let errorMessage: string;
        console.log("ERR: " + typeof(err));
        return throwError(() => errorMessage);
    }
    // private handleLoginError(err: HttpErrorResponse): Observable<never> {
    //     this.store.dispatch(UserPageActions.clearCurrentUser());
    //     console.log("handleLoginError");
    //     console.log("handleLoginError: " + err.statusText);
    //     console.error(err.error);
    //     return throwError(() => err.error);
    // }

    // // TODO review this method
    // private handleError(err: HttpErrorResponse): Observable<any> {
    //     // in a real world app, we may send the server to some remote logging infrastructure
    //     // instead of just logging it to the console
    //     console.log("handleError");
    //     console.log("handleError: " + err.statusText);
    //     let errorMessage: string;
    //     if (err.error instanceof ErrorEvent) {
    //         // A client-side or network error occurred. Handle it accordingly.
    //         errorMessage = `An error occurred: ${err.error.message}`;
    //     } else {
    //         // The backend returned an unsuccessful response code.
    //         // The response body may contain clues as to what went wrong,
    //         errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    //     }
    //     console.error(err.error);
    //     console.error(err.status);
    //     return of({user: null, error: `Backend returned code ${err.status}: ${err.message}`})
    //     return throwError(() => errorMessage);
    // }
}