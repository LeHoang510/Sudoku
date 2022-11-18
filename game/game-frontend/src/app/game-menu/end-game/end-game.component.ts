import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EndGameData} from "../game-menu.component";

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EndGameComponent>, @Inject(MAT_DIALOG_DATA) public data: EndGameData) {}

  ngOnInit(): void {}

  onMenuClick(): void {
    // to menu
  }

}
