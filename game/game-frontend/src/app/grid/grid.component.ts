import { Component, OnInit } from '@angular/core';
import {GridElement} from "../model/gridElement";
import {GridService} from "../service/grid.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  gridElement:GridElement[][]=[];

  constructor(private gridService:GridService) { }

  ngOnInit(): void {
    this.getGrid();
  }
  getGrid():void{
    this.gridElement=this.gridService.getGrid();
  }

}
