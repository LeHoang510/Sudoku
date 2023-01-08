import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../service/game.service";
import {MatDialog} from "@angular/material/dialog";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {TreeUndoHistory} from "interacto";
import {SetValue} from "../command/SetValue";
import {GridService} from "../service/grid.service";


@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit, AfterViewInit {
  coups: number ;
  player_name: String;
  @ViewChild('h')
  h: ElementRef<HTMLElement>= {} as ElementRef;
  historyWidth: string="";

  @HostListener('window:resize',['event'])
  onResize(){
    this.historyWidth=`${this.h.nativeElement.clientWidth}px`;
  }

  constructor(public gameService: GameService, public gridService:GridService, public dialog: MatDialog, private hist:TreeUndoHistory) {
    this.coups=0;
    this.player_name="";
  }

  ngOnInit(): void {
    this.hist.clear();
    this.gameService.getCoups().subscribe(coups=>{
      this.coups=coups;
    });
    this.gameService.getPlayerName().subscribe(name=>{
      this.player_name=name;
    });
    this.gameService.endGameEvent.subscribe(() => this.openEndgame());
  }
  ngAfterViewInit() {
    this.historyWidth=`${this.h.nativeElement.clientWidth}px`;
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

  rootRenderer() {
    return SetValue.getSnapshot(this.gameService,this.gridService,0,0)
  }
}


