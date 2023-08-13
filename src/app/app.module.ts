import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './home/menu.component';
import { ShellComponent } from './home/shell.component';
import { UserModule } from './user/user.module';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ShellComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    NgbModule,
    UserModule,
    AppRoutingModule,
    EffectsModule.forRoot([])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
