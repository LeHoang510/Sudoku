import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grid } from '../model/grid';
import {Level} from "../model/level";
import {ApiService} from "../service/api.service";
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-main-menu-component',
  templateUrl: './main-menu-component.component.html',
  styleUrls: ['./main-menu-component.component.css']
})
export class MainMenuComponentComponent implements OnInit {

  grid:Grid;

  // use suggestions or no
  with_suggestions : boolean = false;

  selectedDifficulty : Level;
  difficulties: String[]= [Level.EASY,Level.MEDIUM,Level.HARD,Level.VERY_HARD,Level.INSANE,Level.INHUMAN];

  constructor(private router: Router, private apiService: ApiService, private http:HttpClient) {
    this.selectedDifficulty=Level.EASY;
    this.grid={gridElements:Array.from({length: 9}, () => Array.from({length: 9})),
      constant:Array.from({length: 9}, () => Array.from({length: 9}))};
   }

  ngOnInit(): void {
    this.changeDifficulty().then(() => console.log("grid is generated"));
  }

  // user's desired name
  user_name : string = ""
  nameInput(s : string) : void{
    this.user_name = s;
  }

  async changeDifficulty(){
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
    this.grid=new Grid(gridElements);
  }

  goToGamePage() : void{
    let player_name=this.user_name;
    if(player_name.trim()==""){
      player_name="foo";  // random name
    }
    this.apiService.startGame(player_name, this.with_suggestions, this.grid);
    this.router.navigate(["/game"]).then(()=>{
      console.log("next page");
    });
  }
}
