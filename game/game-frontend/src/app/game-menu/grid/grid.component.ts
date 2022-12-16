import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Grid} from "../../model/grid";
import {GameService} from "../../service/game.service";
import {GridService} from "../../service/grid.service";
import {PartialMatSelectBinder} from "interacto-angular";
import {SetValue} from "../../command/SetValue";
//import {PartialPointBinder} from "interacto";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {
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
    // 'if' or without 'if' is okay but if we don't use 'if', a glitch will happen =)))
    if(this.grid.gridElements[0][0]!=undefined){
      // need for refresh page
      this.gridService.verification(this.grid);
    }
  }
  ngAfterViewInit(): void{
    /*
    this.bindings.comboBoxBinder()
      .on(this.divs.toArray())
      .toProduce(i => new SetValue(this.gameService,x,y,i.change?.value))
      .bind();

     */
  }


  public setValue(x:number,y:number,binder: PartialMatSelectBinder) {
    binder.toProduce(i => new SetValue(this.gameService,x,y,i.change?.value)).bind();
  }
  /*
  public directSet(x:number,y:number,binder: PartialPointBinder) {
    if(this.gameService.with_suggestion || this.suggestions[x][y].length==1){
      binder.toProduce(i => new SetValue(this.gameService,x,y,this.suggestions[x][y][0])).bind();
    }
  }

   */
}
