import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Grid} from '../model/grid';
import {Level} from "../model/level";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-main-menu-component',
  templateUrl: './main-menu-component.component.html',
  styleUrls: ['./main-menu-component.component.css']
})
export class MainMenuComponentComponent implements OnInit {
  grids:Map<Level,Grid>;
  current_grid:Grid;
  // use suggestions or no
  with_suggestions : boolean = false;

  selectedDifficulty : Level;
  difficulties: String[]= [Level.EASY,Level.MEDIUM,Level.HARD,Level.VERY_HARD,Level.INSANE,Level.INHUMAN];

  constructor(private router: Router, private gameService: GameService, private http:HttpClient) {
    this.selectedDifficulty=Level.EASY;
    this.grids=new Map();
    this.current_grid={gridElements:Array.from({length: 9}, () => Array.from({length: 9})),
      constant:Array.from({length: 9}, () => Array.from({length: 9})),
      scores:[]};
   }

  ngOnInit(): void {
    this.gameService.getGrids().then(grids=>{
      this.grids.set(Level.EASY, grids[0]);
      this.grids.set(Level.MEDIUM, grids[1]);
      this.grids.set(Level.HARD, grids[2]);
      this.grids.set(Level.VERY_HARD, grids[3]);
      this.grids.set(Level.INSANE, grids[4]);
      this.grids.set(Level.INHUMAN, grids[5]);
      this.changeDifficulty();
    })
  }

  // user's desired name
  user_name : string = ""
  nameInput(s : string) : void{
    this.user_name = s;
  }

  changeDifficulty(){
    this.current_grid = this.grids.get(this.selectedDifficulty)!;
  }

  async generatedNewGrid(){
    const gridElements: number[][]=[];
    let url="sudoku-provider/"+this.selectedDifficulty;
    await lastValueFrom(this.http.get(url,{ responseType: 'text'})).then(
      text=>{
        let gridString=text.split('');
        for(let i:number=0; i<9;i++){
          gridElements[i]=[];
          for(let j:number=0; j<9;j++){
            gridElements[i][j]=Number(gridString[j + i * 9]);
          }
        }
      }
    )
    this.current_grid = new Grid(gridElements);
    console.log(this.current_grid);
  }

  goToGamePage() : void{
    let player_name=this.user_name;
    if(player_name.trim()==""){
      player_name="foo";  // random name
    }
    this.gameService.startGame(player_name, this.with_suggestions, this.current_grid, this.selectedDifficulty);
    this.router.navigate(["/game"]).then(()=>{
      console.log("next page");
    });
  }
}
