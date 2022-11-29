import { Injectable } from '@angular/core';
import {BehaviorSubject, lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Score} from "../model/score";
import {Game} from "../model/game";
import {Grid} from "../model/grid";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  player_name:String;
  coups:number;
  grid:Grid;
  with_suggestion: boolean;

  gridBehavior: BehaviorSubject<Grid>;
  suggestionBehavior: BehaviorSubject<boolean>;
  coupsBehavior:BehaviorSubject<number>;
  playerNameBehavior:BehaviorSubject<String>;



  constructor(private http:HttpClient) {
    this.with_suggestion=false;
    this.coups=0;
    this.player_name="Foo";
    this.grid={gridElements:Array.from({length: 9}, () => Array.from({length: 9})),
      constant:Array.from({length: 9}, () => Array.from({length: 9}))};

    this.gridBehavior=new BehaviorSubject<Grid>(this.grid);
    this.suggestionBehavior=new BehaviorSubject<boolean>(this.with_suggestion);
    this.playerNameBehavior=new BehaviorSubject<String>(this.player_name);
    this.coupsBehavior=new BehaviorSubject<number>(this.coups);
  }

  getLeaderboard():Promise<Array<Score>>{
    return lastValueFrom(this.http.get<Array<Score>>("api/leaderboard/list"));
  }
  sendScore(score:Score){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(score);
    this.http.post<Score>("api/leaderboard/send_score",body, {'headers':headers}).subscribe(data=>console.log(data));
  }
  // Get current game
  getGame():Promise<Game>{
    return lastValueFrom(this.http.get<Game>("api/game/game"));
  }
  // Create a new game
  startGame(player_name:String, with_suggestion:boolean, grid:Grid){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(new Game(player_name, with_suggestion, grid));
    this.gridBehavior.next(grid);
    this.suggestionBehavior.next(with_suggestion);
    this.playerNameBehavior.next(player_name);
    this.coupsBehavior.next(0);
    this.http.post<Game>("api/game/new_game", body,{'headers':headers}).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
  addCoup(){
    const body={title:"adding coup"}
    this.http.post<any>("api/game/add_coup",body).subscribe(data=>console.log(data));
  }
  setPlayerName(name:String){
    const body={title:"setting player name"}
    this.http.post<any>("api/game/set_name/"+name,body).subscribe(data=>console.log(data));
  }
  setGrid(grid:Grid){
    const headers = { 'content-type': 'application/json'};
    const body=JSON.stringify(grid);
    this.http.post<Grid>("api/game/set_grid",body, {'headers':headers}).subscribe(data=>console.log(data));
  }

}
