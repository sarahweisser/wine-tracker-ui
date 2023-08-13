import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from "./user";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private baseUserUrl = `http://localhost:8080/api/v1/users`;

    constructor(private http: HttpClient) { }

    createUser(user: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log("in create " + JSON.stringify(user));
        return this.http.post<User>(this.baseUserUrl, user, { headers })
            .pipe(
                tap(data => console.log('createUser: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    updateUser(user: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.baseUserUrl + "/" + user.userId;
        console.log("in update " + JSON.stringify(user));
        return this.http.put<User>(url, user, { headers })
            .pipe(
                tap(data => console.log('update user: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    loginUser(user: User): Observable<User> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.baseUserUrl + "/login";
        console.log('login user: ' + JSON.stringify(user));
        return this.http.post<User>(url, user, { headers })
            .pipe(
                tap(data => console.log('login user 2: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getUserById(user: User): Observable<User> {
        const url = this.baseUserUrl + "/" + user.userId;
        return this.http.get<User>(url)
            .pipe(
                tap(data => console.log('get user by id: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUserUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    // TODO review this method
    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}: ${err.message}`;
        }
        console.error(err.error);
        return throwError(() => errorMessage);
    }
}