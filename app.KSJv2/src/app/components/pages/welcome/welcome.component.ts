import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public tokenParty:String;
  public tokenTeam:String;
  public tokenUser:String;
  constructor() { }
  
  ngOnInit() {
    this.tokenParty = localStorage.getItem('party');
    this.tokenTeam = localStorage.getItem('team');
    this.tokenUser  = localStorage.getItem('User');
  }

}
