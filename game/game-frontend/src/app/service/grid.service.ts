import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Grid} from "../model/grid";

@Injectable({
  providedIn: 'root'
})
export class GridService {
  errors: boolean[][];
  suggestions: number[][][];

  errorsBehavior: BehaviorSubject<boolean[][]>;
  suggestionsBehavior: BehaviorSubject<number[][][]>;

  constructor() {
    this.errors=[];
    this.suggestions=[];

    this.errorsInit();
    this.suggestionsInit();

    this.errorsBehavior=new BehaviorSubject<boolean[][]>(this.errors);
    this.suggestionsBehavior=new BehaviorSubject<number[][][]>(this.suggestions);
  }

  // Attribute initialisation
  errorsInit() {
    for (let i: number = 0; i < 9; i++) {
      this.errors[i] = [];
      for (let j: number = 0; j < 9; j++) {
        this.errors[i][j] = false;
      }
    }
  }
  suggestionsInit(){
    for (let i: number = 0; i < 9; i++) {
      this.suggestions[i] = [];
      for (let j: number = 0; j < 9; j++) {
        this.suggestions[i][j] = Array.from(Array(9+1).keys()).slice(1);
      }
    }
  }

  // Get functions
  getErrors():Observable<boolean[][]>{
    return this.errorsBehavior.asObservable();
  }
  getSuggestions():Observable<number[][][]>{
    return this.suggestionsBehavior.asObservable();
  }
  // check if there is any error
  validate():boolean{
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
  verification(grid: Grid){
    this.errorsInit();
    for (let i =0 ; i< 9; i++) {
      this.row_validation(grid,i);
      this.col_validation(grid,i);
    }
    this.squares_validation(grid);
    this.errorsBehavior.next(this.errors);
  }
  row_validation(grid:Grid,x:number){
    let row_valid=new Map();
    for(let i=0; i<9; i++){
      let val=grid.gridElements[x][i];
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
  col_validation(grid:Grid,y:number){
    let col_valid=new Map();
    for(let i=0; i<9; i++){
      let val=grid.gridElements[i][y];
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
  squares_validation(grid:Grid){
    for (let row = 0 ; row < 9; row = row + 3) {
      for (let col = 0; col < 9; col = col + 3) {
        let squares_valid=new Map();
        for(let r = row; r < row+3; r++) {
          for(let c= col; c < col+3; c++){
            let val=grid.gridElements[r][c];
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


  generateSuggestion(grid: Grid){
    this.suggestionsInit();
    for (let i =0 ; i< 9; i++) {
      this.row_remove(grid,i);
      this.col_remove(grid,i);
    }
    this.squares_remove(grid);
    this.suggestionsBehavior.next(this.suggestions);
  }
  row_remove(grid:Grid,x:number){
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        let val=grid.gridElements[x][j];
        this.suggestions[x][i]=this.suggestions[x][i].filter((element)=>{
          return element!=val;
        });
      }
    }
  }
  col_remove(grid:Grid,y:number){
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        let val=grid.gridElements[j][y];
        this.suggestions[i][y]=this.suggestions[i][y].filter((element)=>{
          return element!=val;
        });
      }
    }
  }
  squares_remove(grid:Grid){
    for (let row = 0 ; row < 9; row = row + 3) {
      for (let col = 0; col < 9; col = col + 3) {
        for(let r = row; r < row+3; r++) {
          for(let c= col; c < col+3; c++){
            for(let a = row; a < row+3; a++) {
              for (let b = col; b < col + 3; b++) {
                let val = grid.gridElements[a][b];
                this.suggestions[r][c] = this.suggestions[r][c].filter((element) => {
                  return element != val;
                });
              }
            }
          }
        }
      }
    }
  }

}
