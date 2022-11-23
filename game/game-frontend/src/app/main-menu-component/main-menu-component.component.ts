import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grid } from '../model/grid';
import { GridService } from '../service/grid.service';
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-main-menu-component',
  templateUrl: './main-menu-component.component.html',
  styleUrls: ['./main-menu-component.component.css']
})
export class MainMenuComponentComponent implements OnInit {

  grid:Grid;

  constructor(private router: Router, private gridService:GridService, private gameService: GameService) {
    this.grid={gridElement:[]};
    this.gridService.getGrid().subscribe(grid => this.grid=grid);
   }

  ngOnInit(): void {}

  // user's desired name
  user_name : string = ""
  nameInput(s : string) : void{
    this.user_name = s;
  }

  // use suggestions or no
  with_suggestions : boolean = false;

  selectedDifficulty : "easy" | "medium" | "hard" | "very hard" = "easy";
  difficulties : string[] = ["easy", "medium", "hard", "very hard"];



  goToGamePage() : void{
    console.log("TODO implement link");
    console.log("user_name : " + this.user_name);
    this.gameService.setPlayerName(this.user_name);
    console.log("with_suggestions : " + this.with_suggestions);
    if(this.with_suggestions){
      this.gameService.enableSuggestion();
    }
    console.log("selectedDifficulty : " + this.selectedDifficulty);
    this.router.navigate(["/game"]);
  }
}
