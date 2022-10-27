import { Injectable } from '@angular/core';
import {GridElement} from "../model/gridElement";
import {MOCKGRID} from "../mock-grid";

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor() { }

  getGrid(): GridElement[][]{
    return MOCKGRID;
  }
}
