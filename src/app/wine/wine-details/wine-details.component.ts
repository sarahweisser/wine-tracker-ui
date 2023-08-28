import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../state/wine.reducer";
import { Router } from "@angular/router";
import { IWine } from "../wine";
import { Observable } from "rxjs";
import { getSelectedWine, getSelectedWineId } from "../state";
import { WinePageActions } from "../state/actions";

@Component({
    selector: 'app-wine-details',
    templateUrl: './wine-details.component.html'
})
export class WineDetailsComponent implements OnInit {
    pageTitle = "Details";
    selectedWineId!: number | undefined;
    selectedWineId$!: Observable<number | undefined>;
    selectedWine$!: Observable<IWine | null>;
    selectedWineDetails!: IWine | null;

    ngOnInit(): void {
        console.log("INIT :: wine details comp");
        this.selectedWineId$ = this.store.select(getSelectedWineId);
        this.selectedWineId$.pipe().subscribe(id => this.selectedWineId = id);
        this.selectedWine$ = this.store.select(getSelectedWine);
        this.selectedWine$.pipe().subscribe(wine => this.selectedWineDetails = wine);
    }
    
    constructor(
        private store: Store<State>,
        private router: Router
    ) { }

    editWine(wine: IWine): void {
        this.router.navigate(['/wines', wine.wineId, 'edit']);
    }

    goToWineReviews(wine: IWine): void {
        // TODO init review list comp with only this wineId
        this.router.navigateByUrl('/userReviewList');
    }

    cancel(): void {
        this.store.dispatch(WinePageActions.clearSelectedWine());
        this.router.navigateByUrl('/wines');
    }
}