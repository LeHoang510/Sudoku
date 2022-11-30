import {Component, OnInit} from '@angular/core';
import {Grid} from "../../model/grid";
import {GameService} from "../../service/game.service";
import {GridService} from "../../service/grid.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  grid: Grid;
  suggestion_mode: boolean;
  errors: boolean[][];
  suggestions: number[][][];

  constructor(private gameService:GameService, private gridService: GridService) {
    this.grid={gridElements:[],constant:[],scores:[]};
    this.errors=[];
    this.suggestions=[];
    this.suggestion_mode=false;

    this.gameService.getSuggestion().subscribe(with_suggestion => this.suggestion_mode=with_suggestion);
  }

  ngOnInit(): void {
    this.gameService.getGrid().subscribe(grid => {
      this.grid=grid;
      this.gridService.generateSuggestion(this.grid);
    });
    this.gridService.getErrors().subscribe(errors => this.errors=errors);
    this.gridService.getSuggestions().subscribe(suggestions => this.suggestions=suggestions);
    // if or without if is okay but if dont have if, a glitch will happen =)))
    if(this.grid.gridElements[0][0]!=undefined){
      // need for refresh page
      this.gridService.verification(this.grid);
    }
  }

  selectTileValue(x:number,y:number,val:number):void{
    this.gameService.setTile(x,y,val);
    this.gridService.verification(this.gameService.grid);
    this.gridService.generateSuggestion(this.gameService.grid);
    this.gameService.checkEndGame();
  }
  setTileValueRightClick(event:Event,x:number,y:number){
    event.preventDefault();
    if(this.gameService.with_suggestion || this.suggestions[x][y].length==1){
      this.selectTileValue(x,y,this.suggestions[x][y][0]);
    }
  }
}
