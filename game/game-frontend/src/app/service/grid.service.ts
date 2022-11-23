import { Injectable } from '@angular/core';
import {Grid} from "../model/grid";
import {GameService} from "./game.service";
import {Level} from "../model/level";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GridService {
  grid: Grid;
  errors: boolean[][];
  constant: boolean[][];
  suggestions: number[][][];

  gridBehavior: BehaviorSubject<Grid>;
  errorsBehavior: BehaviorSubject<boolean[][]>;
  suggestionsBehavior: BehaviorSubject<number[][][]>;

  constructor(private gameService: GameService) {
    this.grid=<Grid>{gridElement:Array.from({length: 9}, () => Array.from({length: 9}))};
    this.constant=Array.from({length: 9}, () => Array.from({length: 9}));
    this.errors=Array.from({length: 9}, () => Array.from({length: 9}));
    this.suggestions=Array.from({length: 9}, () => Array.from({length: 9},()=> Array.from({length: 9})));

    this.errorsInit();
    this.constantInit();

    this.gameService.generateGrid(Level.INHUMAN)
      .then(gridString => {
          let grid=gridString.split('');
          for(let i=0; i<9;i++){
            for(let j=0; j<9;j++){
              let val=Number(grid[j + i * 9])
              this.grid.gridElement[i][j]=val;
              if(val==0){
                this.constant[i][j]=false;
              }
            }
          }
        }
      )

    this.gridBehavior=new BehaviorSubject<Grid>(this.grid);
    this.errorsBehavior=new BehaviorSubject<boolean[][]>(this.errors);
    this.suggestionsBehavior=new BehaviorSubject<number[][][]>(this.suggestions);
  }

  // Attribute initialisation
  errorsInit(){
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        this.errors[i][j]=false;
      }
    }
  }
  constantInit(){
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        this.constant[i][j]=true;
      }
    }
  }

  // Get functions
  getGrid():Observable<Grid>{
    return this.gridBehavior.asObservable();
  }
  getErrors():Observable<boolean[][]>{
    return this.errorsBehavior.asObservable();
  }
  getSuggestions():Observable<number[][][]>{
    return this.suggestionsBehavior.asObservable();
  }
  getConstant():boolean[][]{
    return this.constant;
  }

  // Set functions
  setTile(x:number,y:number,value:number){
    this.gameService.addCoups();
    if(value==undefined){
      this.grid.gridElement[x][y]=0;
    }else {
      this.grid.gridElement[x][y]=value;
    }
    this.gridBehavior.next(this.grid);
    this.verification();
    if(this.checkEndGame()){
      this.notifyEndGame();
    }
  }

  // Notify end game
  notifyEndGame(){
    this.gameService.notifyEndGame();
  }

  // Check end game
  checkEndGame():boolean{
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if(this.grid.gridElement[i][j]==0){
          return false;
        }
      }
    }
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if(this.errors[i][j]){
          return false;
        }
      }
    }
    return true;
  }


  // Verification functions
  verification(){
    this.errorsInit();
    for (let i =0 ; i< 9; i++) {
      this.row_validation(i);
      this.col_validation(i);
    }
    this.squares_validation();
    this.errorsBehavior.next(this.errors);
  }
  row_validation(x:number){
    let row_valid=new Map();
    for(let i=0; i<9; i++){
      let val=this.grid.gridElement[x][i];
      if(val!=0){
        if(row_valid.has(val)){
          this.errors[x][i]=true;
          this.errors[x][row_valid.get(val)]=true;
        }else{
          row_valid.set(val,i);
        }
      }
    }
  }
  col_validation(y:number){
    let col_valid=new Map();
    for(let i=0; i<9; i++){
      let val=this.grid.gridElement[i][y];
      if(val!=0){
        if(col_valid.has(val)){
          this.errors[i][y]=true;
          this.errors[col_valid.get(val)][y]=true;
        }else{
          col_valid.set(val,i);
        }
      }
    }
  }
  squares_validation(){
    for (let row = 0 ; row < 9; row = row + 3) {
      for (let col = 0; col < 9; col = col + 3) {
        let squares_valid=new Map();
        for(let r = row; r < row+3; r++) {
          for(let c= col; c < col+3; c++){
            let val=this.grid.gridElement[r][c];
            if(val != 0){
              if(squares_valid.has(val)){
                this.errors[r][c]=true;
                this.errors[squares_valid.get(val).x][squares_valid.get(val).y]=true;
              }else{
                squares_valid.set(val,{x:r,y:c});
              }
            }
          }
        }
      }
    }
  }

}
