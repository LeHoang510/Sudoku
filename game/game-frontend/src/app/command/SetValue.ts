import {UndoableCommand, UndoableSnapshot} from "interacto";
import {GameService} from "../service/game.service";
import {GridService} from "../service/grid.service";

export class SetValue extends UndoableCommand {
  private readonly x: number;
  private readonly y:number;
  private readonly oldValue: number;
  private readonly newValue: number;
  private readonly gameService: GameService;
  private readonly gridService: GridService;


  public constructor(gameService:GameService, gridService: GridService, x:number, y:number, newValue:number) {
    super();
    this.gameService=gameService;
    this.gridService=gridService;

    this.x=x;
    this.y=y;
    this.oldValue=this.gameService.grid.gridElements[x][y];
    this.newValue=newValue;

    console.log(this.oldValue);
    console.log(this.newValue);
  }

  public override canExecute(): boolean {
    let bool= (this.oldValue==0 && this.newValue==undefined);
    return this.oldValue !== this.newValue && !bool;
  }
  protected execution(): void {
    this.gameService.setTile(this.x, this.y, this.newValue);
    this.getVisualSnapshot();
  }
  public redo(): void {
    this.gameService.setValue(this.x, this.y, this.newValue);
  }
  public undo(): void {
    this.gameService.setValue(this.x, this.y, this.oldValue);
  }
  public override getVisualSnapshot(): Promise<HTMLElement> | HTMLElement | undefined {
    return SetValue.getSnapshot(this.gameService, this.gridService, this.x, this.y);
  }
  public rootRenderer(): UndoableSnapshot {
    return SetValue.getSnapshot(this.gameService, this.gridService, this.x, this.y);
  }

  public static getSnapshot(gameService:GameService, gridService:GridService, x:number, y:number): HTMLImageElement {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const tileSize = 110;
    canvas.width = 1000;
    canvas.height = 1000;
    ctx.font = '100px Bodo';
    ctx.fillStyle = 'black';

    if(gridService.errors[x][y]) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if(gameService.grid.gridElements[i][j]==0){
            ctx.fillText("", ((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
          }else if(gridService.errors[i][j]){
            ctx.fillStyle = 'red';
            ctx.fillRect(((j+i*9) % 9) * tileSize,Math.floor((j+i*9) / 9) * tileSize,110,110);
            if(x===i && y===j){
              console.log("i="+i+"j="+j);
              console.log("x="+x+"y="+y);
              ctx.fillStyle = 'green';
              ctx.fillText(gameService.grid.gridElements[i][j].toString(), ((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
            }else{
              ctx.fillStyle = 'black';
              ctx.fillText(gameService.grid.gridElements[i][j].toString(), ((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
            }
          }else{
            ctx.fillStyle = 'black';
            ctx.fillText(gameService.grid.gridElements[i][j].toString(), ((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
          }
        }
      }
    }else if(gridService.suggestions[x][y].length>=1 && gameService.grid.gridElements[x][y]!=0) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          ctx.fillStyle = 'purple';
          ctx.fillRect(((j+i*9) % 9) * tileSize,Math.floor((j+i*9) / 9) * tileSize,110,110);
          if(gameService.grid.gridElements[i][j]==0){
            ctx.fillText("",((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
          }else if(x==i && y==j){
            ctx.fillStyle = 'green';
            ctx.fillText(gameService.grid.gridElements[i][j].toString(), ((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
          }else{
            ctx.fillStyle = 'black';
            ctx.fillText(gameService.grid.gridElements[i][j].toString(), ((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
          }
        }
      }
    }else{
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if(gameService.grid.gridElements[i][j]==0){
            ctx.fillText("",((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
          }else{
            ctx.fillStyle = 'black';
            ctx.fillText(gameService.grid.gridElements[i][j].toString(), ((j+i*9) % 9) * tileSize + 30, Math.floor((j+i*9) / 9) * tileSize + 85);
          }
        }
      }
    }

    for(let i = 1; i < 9; i++) {
      ctx.moveTo(i * tileSize, 0);
      ctx.lineTo(i * tileSize, canvas.height);
      ctx.moveTo(0, i * tileSize);
      ctx.lineTo(canvas.width, i * tileSize);
    }
    ctx.stroke(); // Draw the content
    const imgCache = new Image();
    imgCache.src = canvas.toDataURL("image/png");
    return imgCache;
  }


}
