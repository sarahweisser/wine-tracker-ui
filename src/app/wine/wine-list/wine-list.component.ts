import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../state/wine.reducer";
import { Observable } from "rxjs";
import { IWine } from "../wine";
import { getWineList } from "../state";
import { WinePageActions } from "../state/actions";
import { Router } from "@angular/router";

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html'
})
export class WineListComponent implements OnInit {
  wineList$!: Observable<IWine[]>; 
  pageTitle = "Wine List";

  ngOnInit(): void {
    console.log("INIT :: wine list comp");
    this.wineList$ = this.store.select(getWineList);
    this.store.dispatch(WinePageActions.loadWines());
  }

  constructor(
    private store: Store<State>,
    private router: Router
  ) { }

  wineSelected(wine: IWine): void {
    console.log("in wine list: " + wine.wineName);
    this.store.dispatch(WinePageActions.wineSelected({ wine }));
    this.router.navigate(['/wines', wine.wineId]);
  }

  addNewWine(): void {
    this.router.navigate(['/wines/0/edit']);
  }
}