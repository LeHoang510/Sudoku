import {Score} from "./score";

export class Grid {
  gridElements : number[][];
  constant : boolean[][];
  scores : Score[];

  constructor(gridElements: number[][]) {
    this.gridElements=gridElements;
    this.constant=[];
    this.scores=[];

    for(let i:number=0; i<9;i++){
      this.constant[i]=[];
      for(let j:number=0; j<9;j++){
        this.constant[i][j]=this.gridElements[i][j]!=0;
      }
    }
  }
}
