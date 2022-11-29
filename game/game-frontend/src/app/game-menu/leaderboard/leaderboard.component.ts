import { Component, OnInit } from '@angular/core';
import {Score} from "../../model/score";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: Score[];
  length: number[];

  constructor(private gameService: GameService) {
    this.leaderboard=[];
    this.length=[];
  }

  ngOnInit(): void {
    this.leaderboard=this.gameService.grid.scores.sort((s1,s2)=>{
      if(s1.score>s2.score) return 1;
      if(s1.score<s2.score) return -1;
      return 0;
    });
    this.length=Array.from(Array(this.leaderboard.length).keys());
  }
}
