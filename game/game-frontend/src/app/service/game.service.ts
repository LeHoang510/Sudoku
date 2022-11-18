import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
// import {MockGrid} from "../mock/mock-grid";
// import {MockLeaderboard} from "../mock/mock-leaderboard";
import {HttpClient} from "@angular/common/http";
import {Score} from "../model/score";
import {Level} from "../model/level";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  player_name:String;
  coups:number;
  suggestion_mode:boolean;

  coupsBehavior:BehaviorSubject<number>;
  playerNameBehavior:BehaviorSubject<String>;

  endGameEvent:EventEmitter<boolean>;


  constructor(private http:HttpClient) {
    this.coups=0;
    this.player_name="Foo";
    this.suggestion_mode=false;
    this.playerNameBehavior=new BehaviorSubject<String>(this.player_name);
    this.coupsBehavior=new BehaviorSubject<number>(this.coups);
    this.endGameEvent=new EventEmitter<boolean>();
  }
  addCoups():void{
    this.coups=this.coups+1;
    this.coupsBehavior.next(this.coups);
  }
  getCoups(){
    return this.coupsBehavior.asObservable();
  }
  setPlayerName(name:String){
    this.player_name=name;
    this.playerNameBehavior.next(this.player_name);
  }
  getPlayerName():Observable<String>{
    return this.playerNameBehavior.asObservable();
  }
  enableSuggestion():void{
    this.suggestion_mode=true;
  }
  getSuggestionMode():boolean{
    return this.suggestion_mode;
  }
  notifyEndGame(){
    this.endGameEvent.emit();
  }


  // Call REST API
  generateGrid(level:Level):Promise<String>{
    let url="sudoku-provider/"+level;
    return lastValueFrom(this.http.get(url,{ responseType: 'text'}));
  }
  getLeaderboard():Promise<Array<Score>>{
    return lastValueFrom(this.http.get<Array<Score>>("api/leaderboard/list"));
    // return MockLeaderboard;
  }
}
