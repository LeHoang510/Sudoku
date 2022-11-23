import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { MainMenuComponentComponent } from './main-menu-component/main-menu-component.component';

const routes: Routes = [
  { path: "menu", component: MainMenuComponentComponent},
  { path: "game", component: GameMenuComponent},
  { path: "", redirectTo: "/menu", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
