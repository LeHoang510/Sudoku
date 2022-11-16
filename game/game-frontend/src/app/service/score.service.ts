import { Injectable } from '@angular/core';
import {Score} from "../model/score";
import {MockLeaderboard} from "../mock/mock-leaderboard";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  getLeaderboard(): Score[]{
    return MockLeaderboard;
  }
}
