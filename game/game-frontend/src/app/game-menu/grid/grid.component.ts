import {Component, HostListener, OnInit} from '@angular/core';
import {GridService} from "../../service/grid.service";
import {Grid} from "../../model/grid";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  grid: Grid;
  suggestion_mode: boolean = true;

  constructor(private gridService:GridService, private gameService:GameService) {
    this.grid=this.gridService.getGrid();
  }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key === "1") {
      const element = document.querySelectorAll( "mat-select:hover")[0];
      console.log( element);
      console.log((element as HTMLSelectElement).value);

    }
  }
  ngOnInit(): void {

  }

  addCoups():void{
    this.gameService.addCoups();
  }

  setTileValueKeyboard(event:Event){
    console.log(event);
  }
}
