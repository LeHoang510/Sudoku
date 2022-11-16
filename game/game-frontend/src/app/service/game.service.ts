import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private coups:number;
  private coupsBehavior:BehaviorSubject<number>;
  private player_name:String;
  private playerNameBehavior:BehaviorSubject<String>;

  constructor() {
    this.coups=0;
    this.player_name="Foo";
    this.playerNameBehavior = new BehaviorSubject<String>(this.player_name);
    this.coupsBehavior= new BehaviorSubject<number>(this.coups);
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
  getPlayerName(){
    return this.playerNameBehavior.asObservable();
  }
}
