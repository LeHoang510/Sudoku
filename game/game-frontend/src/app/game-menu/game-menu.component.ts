import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {MatDialog} from "@angular/material/dialog";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {EndGameComponent} from "./end-game/end-game.component";


export interface EndGameData {
  name: string;
  score: number;
}

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {
  coups: number | undefined;
  player_name: String | undefined;
  constructor(private gameService: GameService, public dialog: MatDialog) {
    this.gameService.getCoups().subscribe(coups=>{
      this.coups=coups;
    })
    this.gameService.getPlayerName().subscribe(name=>{
      this.player_name=name;
    })
  }

  ngOnInit(): void {
  }

  setPlayerName(event: Event): void{
    let name=(event.target as HTMLInputElement).value;
    this.gameService.setPlayerName(name);
  }

  openLeaderboard(): void{
    this.dialog.open(LeaderboardComponent, {
      width: '600px'
    });
  }
  openEndgame(): void{
    this.dialog.open(EndGameComponent, {
      width: '600px',
      data: {name: this.player_name, score: this.coups},
    });
  }
}


