import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Score} from "../../model/score";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: Score[];

  constructor(public dialogRef: MatDialogRef<LeaderboardComponent>, private gameService: GameService) {
    this.leaderboard=[];
  }

  ngOnInit(): void {
    this.gameService.getLeaderboard()
      .then(leaderboard =>{
       this.leaderboard=leaderboard;
      }
    )
  }
}
