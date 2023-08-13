import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IWine } from "./wine";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class WineService {
    private baseWineUrl = `http://localhost:8080/api/v1/wines`;

    constructor(private http: HttpClient) { }

    createWine(wine: IWine): Observable<IWine> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log("in create " + JSON.stringify(wine));
        return this.http.post<IWine>(this.baseWineUrl, wine, { headers })
            .pipe(
                tap(data => console.log('createWine: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    updateWine(wine: IWine): Observable<IWine> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = this.baseWineUrl + "/" + wine.wineId;
        console.log("in update " + JSON.stringify(wine));
        return this.http.put<IWine>(url, wine, { headers })
            .pipe(
                tap(data => console.log('update wine: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getWineById(wine: IWine): Observable<IWine> {
        const url = this.baseWineUrl + "/" + wine.wineId;
        return this.http.get<IWine>(url)
            .pipe(
                tap(data => console.log('get wine by id: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    getWines(): Observable<IWine[]> {
        return this.http.get<IWine[]>(this.baseWineUrl)
            .pipe(
                tap(data => console.log('get wines: ' + JSON.stringify(data))),
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

    // TODO add delete for admin use
}