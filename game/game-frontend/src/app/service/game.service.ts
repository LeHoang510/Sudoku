import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private coups:number;
  private coupsBehavior= new BehaviorSubject<number>(0);
  constructor() {
    this.coups=0;
  }
  selectValue():void{
    this.coups=this.coups+1;
    this.coupsBehavior.next(this.coups);
  }
  getCoups(){
    return this.coupsBehavior.asObservable();
  }
}
