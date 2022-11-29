import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Grid} from "../model/grid";
import {ApiService} from "./api.service";
import {GridService} from "./grid.service";
import {Score} from "../model/score";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  player_name:String;
  coups:number;
  with_suggestion: boolean;
  grid: Grid;

  coupsBehavior:BehaviorSubject<number>;
  playerNameBehavior:BehaviorSubject<String>;
  gridBehavior:BehaviorSubject<Grid>;
  suggestionBehavior:BehaviorSubject<boolean>;

  endGameEvent:EventEmitter<boolean>;

  constructor(private apiService: ApiService, private gridService:GridService) {
    this.coups=0;
    this.player_name="Foo";
    this.with_suggestion=false;
    this.grid={gridElements:Array.from({length: 9}, () => Array.from({length: 9})),
      constant:Array.from({length: 9}, () => Array.from({length: 9}))};

    this.playerNameBehavior=new BehaviorSubject<String>(this.player_name);
    this.coupsBehavior=new BehaviorSubject<number>(this.coups);
    this.suggestionBehavior=new BehaviorSubject<boolean>(this.with_suggestion);
    this.gridBehavior=new BehaviorSubject<Grid>(this.grid);
    this.endGameEvent=new EventEmitter<boolean>();

    this.refreshPage();
    this.apiServiceSubscribe();
  }

  // run when refresh page: getting data from backend
  refreshPage(){
    this.apiService.getGame().then(game=>{
      this.player_name=game.player_name;
      this.grid=game.grid;
      this.coups=game.coups;
      this.with_suggestion=game.with_suggestion;

      this.gridBehavior.next(this.grid);
      this.playerNameBehavior.next(this.player_name);
      this.coupsBehavior.next(this.coups);
      this.suggestionBehavior.next(this.with_suggestion);

      this.gridService.verification(this.grid);
    })
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
    this.apiService.setGrid(this.grid);
  }
  addCoups():void{
    this.coups=this.coups+1;
    this.coupsBehavior.next(this.coups);
    this.apiService.addCoup();
  }
  getCoups(){
    return this.coupsBehavior.asObservable();
  }
  setPlayerName(name:String){
    this.player_name=name;
    this.playerNameBehavior.next(this.player_name);
    this.apiService.setPlayerName(name);
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
        this.sendScore();
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
  sendScore(){
    this.apiService.getLeaderboard().then(leaderboard =>{
        const sortedScores=leaderboard.sort((s1,s2)=>{
          if(s1.score>s2.score) return 1;
          if(s1.score<s2.score) return -1;
          return 0;
        });
        if(sortedScores.length<5 || this.coups<sortedScores[sortedScores.length-1].score){
          this.apiService.sendScore(<Score>{name:this.player_name,score:this.coups});
        }
      }
    )
  }

  // Receive new game data when a game is created by ApiService
  apiServiceSubscribe(){
    this.apiService.gridBehavior.asObservable().subscribe(
      grid=>{
        this.grid=grid;
        this.gridBehavior.next(grid);
      }
    )
    this.apiService.suggestionBehavior.asObservable().subscribe(
      with_suggestion=>{
        this.with_suggestion=with_suggestion;
        this.suggestionBehavior.next(with_suggestion);
      }
    )
    this.apiService.coupsBehavior.asObservable().subscribe(
      coups=>{
        this.coups=coups;
        this.coupsBehavior.next(coups);
      }
    )
    this.apiService.playerNameBehavior.asObservable().subscribe(
      player_name=>{
        this.player_name=player_name;
        this.playerNameBehavior.next(player_name);
      }
    )
  }
}
