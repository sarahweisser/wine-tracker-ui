import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../user/state/user.reducer';
import { getShowMenu, getUserLoggedIn } from '../user/state';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnInit {
  userLoggedIn$!: Observable<boolean>;
  showMenu$!: Observable<boolean>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    console.log("INIT :: shell comp");
    this.userLoggedIn$ = this.store.select(getUserLoggedIn);
    this.showMenu$ = this.store.select(getShowMenu);
  }

}
