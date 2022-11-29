import {Grid} from "./grid";

export class Game {
  grid : Grid ;
  player_name : String;
  with_suggestion : boolean;
  coups: number;

  constructor(player_name: String, with_suggestion:boolean, grid:Grid) {
    this.player_name=player_name;
    this.with_suggestion=with_suggestion;
    this.grid=grid;
    this.coups=0;
  }
}
