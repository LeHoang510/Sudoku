import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grid } from '../model/grid';
import { GridService } from '../service/grid.service';

@Component({
  selector: 'app-main-menu-component',
  templateUrl: './main-menu-component.component.html',
  styleUrls: ['./main-menu-component.component.css']
})
export class MainMenuComponentComponent implements OnInit {

  grid:Grid;

  constructor(private router: Router, private gridService:GridService) {
    this.grid=this.gridService.getGrid();
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
    console.log("with_suggestions : " + this.with_suggestions);
    console.log("selectedDifficulty : " + this.selectedDifficulty);
    this.router.navigate(["/game"]);
  }
}
