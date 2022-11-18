import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ScoreService} from "../../service/score.service";
import {Score} from "../../model/score";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: Score[];

  constructor(public dialogRef: MatDialogRef<LeaderboardComponent>, private scoreboardService: ScoreService) {
    this.leaderboard=this.scoreboardService.getLeaderboard();
  }

  ngOnInit(): void {}
}
