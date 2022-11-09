import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu-component',
  templateUrl: './main-menu-component.component.html',
  styleUrls: ['./main-menu-component.component.css']
})
export class MainMenuComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // user's desired name
  user_name : string = ""
  nameInput(s : string) : void{
    this.user_name = s;
  }

  // use suggestions or no
  with_suggestions : boolean = false;

}
