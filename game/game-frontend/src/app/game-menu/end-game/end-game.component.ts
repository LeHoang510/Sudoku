import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../../service/game.service";

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  constructor(public gameService:GameService, private router:Router) {}

  ngOnInit(): void {}

  onMenuClick(): void {
    this.router.navigate(["/menu"]).then(()=>{
      console.log("to menu");
    });
  }

}
