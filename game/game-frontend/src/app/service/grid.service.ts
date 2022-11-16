import { Injectable } from '@angular/core';
import {MOCKGRID} from "../mock/mock-grid";
import {Grid} from "../model/grid";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor() { }

  getGrid(): Grid{
    return MOCKGRID;
  }
}
