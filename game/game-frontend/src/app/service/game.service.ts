import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {Grid} from "../model/grid";
import {GridService} from "./grid.service";
import {HttpClient} from "@angular/common/http";
import {Score} from "../model/score";
import {Level} from "../model/level";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  level:String;
  player_name:String;
  coups:number;
  with_suggestion: boolean;
  grid: Grid;

  coupsBehavior:BehaviorSubject<number>;
  playerNameBehavior:BehaviorSubject<String>;
  gridBehavior:BehaviorSubject<Grid>;
  suggestionBehavior:BehaviorSubject<boolean>;

  endGameEvent:EventEmitter<boolean>;

  constructor(private http: HttpClient, private gridService:GridService) {
    this.level="";
    this.coups=0;
    this.player_name="Foo";
    this.with_suggestion=false;

    this.grid={gridElements:Array.from({length: 9}, () => Array.from({length: 9})),
      constant:Array.from({length: 9}, () => Array.from({length: 9})),
      scores:[]};

    this.playerNameBehavior=new BehaviorSubject<String>(this.player_name);
    this.coupsBehavior=new BehaviorSubject<number>(this.coups);
    this.suggestionBehavior=new BehaviorSubject<boolean>(this.with_suggestion);
    this.gridBehavior=new BehaviorSubject<Grid>(this.grid);

    this.endGameEvent=new EventEmitter<boolean>();

    this.refreshPage();
  }

  startGame(player_name: String, with_suggestion: boolean, grid: Grid, level: Level){
    this.level=level;
    this.grid=grid;
    this.player_name=player_name;
    this.with_suggestion=with_suggestion;

    this.gridBehavior.next(grid);
    this.suggestionBehavior.next(with_suggestion);
    this.playerNameBehavior.next(player_name);

    localStorage.setItem("grid",JSON.stringify(grid));
    localStorage.setItem("with_suggestion",String(with_suggestion));
    localStorage.setItem("player_name",String(player_name));
    localStorage.setItem("level",String(level));
  }
  refreshPage(){
    this.grid=JSON.parse(localStorage.getItem("grid")!) as Grid;
    this.player_name=localStorage.getItem("player_name")!;
    this.with_suggestion=JSON.parse(localStorage.getItem("with_suggestion")!);
    this.level=localStorage.getItem("level")!;

    this.gridBehavior.next(this.grid);
    this.suggestionBehavior.next(this.with_suggestion);
    this.playerNameBehavior.next(this.player_name);
  }

  // Get and set value of game service
  getGrid(){
    return this.gridBehavior.asObservable();
  }
  setTile(x:number,y:number,value:number){
    this.addCoups();
    if(value==undefined){
      this.grid.gridElements[x][y]=0;
    }else {
      this.grid.gridElements[x][y]=value;
    }
    this.gridBehavior.next(this.grid);
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
    localStorage.setItem("player_name",String(this.player_name));
  }
  getPlayerName():Observable<String>{
    return this.playerNameBehavior.asObservable();
  }
  getSuggestion():Observable<boolean>{
    return this.suggestionBehavior.asObservable();
  }

  // Check end game
  checkEndGame(){
    if(this.win()){
      this.notifyEndGame();
      if(!this.with_suggestion){
        const headers = { 'content-type': 'application/json'};
        const body=JSON.stringify(<Score>{score:this.coups, name:this.player_name});
        this.http.post<Score>("api/game/send_score/"+this.level,body,{'headers':headers});
      }
    }
  }
  notifyEndGame(){
    this.endGameEvent.emit();
  }
  win():boolean{
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if(this.grid.gridElements[i][j]==0){
          return false;
        }
      }
    }
    return this.gridService.validate();
  }

  // API functions
  getGrids(){
    return lastValueFrom(this.http.get<Array<Grid>>("api/game/get_grids"));
  }
}
