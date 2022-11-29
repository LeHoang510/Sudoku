import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {HttpClientModule} from "@angular/common/http";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {RouterModule} from "@angular/router";
import {InteractoModule, interactoTreeUndoProviders} from "interacto-angular";

import { MainMenuComponentComponent } from './main-menu-component/main-menu-component.component';

import { GridComponent } from './game-menu/grid/grid.component';
import {GameMenuComponent} from './game-menu/game-menu.component';
import {MatDialogModule} from "@angular/material/dialog";
import { LeaderboardComponent } from './game-menu/leaderboard/leaderboard.component';
import { EndGameComponent } from './game-menu/end-game/end-game.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,

    MainMenuComponentComponent,

    GameMenuComponent,
    LeaderboardComponent,
    EndGameComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        InteractoModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        FormsModule,
        MatCheckboxModule,
        RouterModule,
        MatDialogModule,
        MatCardModule
    ],
  providers: [interactoTreeUndoProviders(true)],
  bootstrap: [AppComponent]
})
export class AppModule {
}
