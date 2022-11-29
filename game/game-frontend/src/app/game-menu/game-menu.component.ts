import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {MatDialog} from "@angular/material/dialog";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";


@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {
  coups: number ;
  player_name: String;

  constructor(private gameService: GameService, public dialog: MatDialog) {
    this.coups=0;
    this.player_name="";
  }

  ngOnInit(): void {
    this.gameService.getCoups().subscribe(coups=>{
      this.coups=coups;
    });
    this.gameService.getPlayerName().subscribe(name=>{
      this.player_name=name;
    });
    this.gameService.endGameEvent.subscribe(response => this.openEndgame());
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
    let element = document.getElementById("end-game");
    if (element != null) {
      element.style.display = 'block';
    }
  }
}


