export class Grid {
  gridElements : number[][];
  constant : boolean[][];

  constructor(gridElements: number[][]) {
    this.gridElements=gridElements;
    this.constant=[];

    for(let i:number=0; i<9;i++){
      this.constant[i]=[];
      for(let j:number=0; j<9;j++){
        this.constant[i][j]=this.gridElements[i][j]!=0;
      }
    }
  }
}
