import { Component, OnInit } from '@angular/core';
import { GridElement } from '../model/gridElement';
import { GridService } from '../service/grid.service';

@Component({
  selector: 'app-main-menu-component',
  templateUrl: './main-menu-component.component.html',
  styleUrls: ['./main-menu-component.component.css']
})
export class MainMenuComponentComponent implements OnInit {

  gridElement:GridElement[][]=[];

  constructor(private gridService:GridService) { }

  ngOnInit(): void {
    this.getGrid();
  }
  getGrid():void{
    this.gridElement=this.gridService.getGrid();
  }
  
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
  }
}
