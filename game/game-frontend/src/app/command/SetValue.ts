import {UndoableCommand, UndoableSnapshot} from "interacto";
import {GameService} from "../service/game.service";

export class SetValue extends UndoableCommand {
  private readonly x: number;
  private readonly y:number;
  private readonly oldValue: number;
  private readonly newValue: number;
  private gameService: GameService;

  public constructor(gameService:GameService, x:number, y:number, newValue:number) {
    super();
    this.gameService=gameService;

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
    return SetValue.getSnapshot(this.gameService.grid.gridElements);
  }
  public rootRenderer(): UndoableSnapshot {
    return SetValue.getSnapshot(this.gameService.grid.gridElements);
  }
  public static getSnapshot(gridElements: number[][]): HTMLImageElement {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const tileSize = 110;
    canvas.width = 1000;
    canvas.height = 1000;
    ctx.font = '100px Bodo';
    ctx.fillStyle = 'black';
    for (let i = 0; i < 9; i++){
      for (let j = 0; j < 9; j++) {
        let val="";
        if(gridElements[i][j]!=0){
          val=gridElements[i][j].toString();
        }
        ctx.fillText(val, (i % 9) * tileSize + 30, Math.floor(i / 9) * tileSize + 85);
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
