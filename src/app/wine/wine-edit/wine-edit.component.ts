import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../state/wine.reducer";
import { WinePageActions } from "../state/actions";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { IWine } from "../wine";
import { getSelectedWine } from "../state";
import { Observable, take } from "rxjs";

// TODO reuse this component for admin page
// add submit for review button and call

@Component({
  selector: 'app-wine-edit',
  templateUrl: './wine-edit.component.html'
})
export class WineEditComponent implements OnInit {
  pageTitle = "Edit Wine";
  wineId!: string | null;
  currentWine$!: Observable<IWine | null>;
  currentWine!: IWine | null;
  wineToSubmit!: IWine;
  // TODO prefill fields when editing existing wine
  // wineForm = new FormGroup({
  //   wineName: new FormControl(''),
  //   wineryName: new FormControl(''),
  //   vintage: new FormControl('')
  // })

  currentUrl!: any;
  // for adding and editing wines
  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("INIT :: wine edit comp");
    
    this.route.paramMap.subscribe(
      (params) => {
        console.log("Param key: " + params.keys);
        this.wineId = params.get('id');
        // get wine by id from service
      }
    );
    this.currentWine$ = this.store.select(getSelectedWine);
    // Is there a better way to get this value?
    this.currentWine$.pipe(take(1)).subscribe(wine => this.currentWine = wine);
    if (this.currentWine) {
      console.log(JSON.stringify(this.currentWine));
      // this.wineForm.setValue({
      //   wineName: this.currentWine?.wineName,
      //   wineryName: this.currentWine?.wineName,
      //   vintage: this.currentWine?.vintage
      // });
    }
    // check for edit vs add wine
    if (this.wineId && +this.wineId > 0) {
      // populate the wine date for existing wine
    } else {
      this.pageTitle = "Submit new wine for review"
      this.store.dispatch(WinePageActions.clearSelectedWine());
    }
  }

  submitWine(wineForm: NgForm): void {
    console.log("submitWine");
    if (wineForm && wineForm.valid) {
      const wineName = wineForm.form.value.wineName;
      const wineryName = wineForm.form.value.wineryName;
      const vintage = wineForm.form.value.vintage;
      // TODO validate data for security
      this.wineToSubmit = {
        wineName: wineName,
        wineryName: wineryName,
        vintage: vintage
      } as IWine;
      console.log("Wine submitted for review: " + JSON.stringify(this.wineToSubmit));
      // TODO send message to queue to review wine
    }
  }

  // route to wine list if on 'Submit Wine' screen
  // route to wine detail if exisiting wine is selected
  wineUnSelected(): void {
    if (this.wineId === '0') {
      this.store.dispatch(WinePageActions.clearSelectedWine());
      this.router.navigateByUrl('/wines');
    } else {
      this.router.navigate(['wines', this.wineId]);
    }
  }

  addWineToWineList(newWine: IWine): void {
    // this functionality will be admin only

  }

  editWineInWineList(existingWine: IWine): void {
    // this functionality will be admin only

  }
}