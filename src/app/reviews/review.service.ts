import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserReview } from "./review";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UserReviewService {
    private baseUserReviewUrl = `http://localhost:8080/api/v1/reviews`;

    constructor(private http: HttpClient) { }

    getUserReviews(): Observable<UserReview[]> {
        return this.http.get<UserReview[]>(this.baseUserReviewUrl)
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
        console.error(err);
        return throwError(() => errorMessage);
    }
}