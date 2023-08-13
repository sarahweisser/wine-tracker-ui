import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./state/user.reducer";
import { AddUserComponent } from "./add-user.component";
import { UserEffects } from "./state/user.effects";
import { EffectsModule } from "@ngrx/effects";
import { ShellComponent } from "../home/shell.component";

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('users', userReducer),
    RouterModule.forChild([
      { path: '', component: ShellComponent },
      { path: 'login', component: LoginComponent },
      { path: 'createUser', component: AddUserComponent }
    ]),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [
    LoginComponent,
    AddUserComponent
  ]
})
export class UserModule { }