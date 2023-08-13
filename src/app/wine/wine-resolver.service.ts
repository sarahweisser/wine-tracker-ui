import { Injectable } from "@angular/core";
import { IWine } from "./wine";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

// @Injectable({
//     providedIn: 'root'
// })
// export class WineResolver implements Resolve<IWine> {
//     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWine> {
//         const id = +route.paramMap.get('id');
//         return null;
//     }
    
// }