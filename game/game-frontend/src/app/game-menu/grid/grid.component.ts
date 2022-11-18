import {Component, HostListener, OnInit} from '@angular/core';
import {Grid} from "../../model/grid";
import {GameService} from "../../service/game.service";
// import {Level} from "../../model/level";
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
  constant: boolean[][];
  suggestions: number[][][];

  constructor(private gameService:GameService, private gridService: GridService) {
    this.grid={gridElement:[]};
    this.constant=[];
    this.errors=[];
    this.suggestions=[];

    this.gridService.getGrid().subscribe(grid => this.grid=grid);
    this.gridService.getErrors().subscribe(errors => this.errors=errors);
    this.gridService.getSuggestions().subscribe(suggestions => this.suggestions=suggestions);

    this.suggestion_mode=this.gameService.getSuggestionMode();
    this.constant=this.gridService.getConstant();
  }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === "1") {
      const element = document.querySelectorAll( "mat-select:hover")[0];
      console.log( element);
      console.log((element as HTMLSelectElement).value);
      console.log(this.grid.gridElement);
    }
  }

  ngOnInit(): void {
  }

  selectTileValue(x:number,y:number,val:number):void{
    this.gameService.addCoups();
    this.gridService.setTile(x,y,val);
  }

  setTileValueKeyboard(event:Event){
    console.log(event);
  }

}
