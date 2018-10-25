import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { SelectPartyComponent } from '../select-party/select-party.component';
import { AddTeamComponent } from '../add-team/add-team.component';
import { AddMemberComponent } from '../add-member/add-member.component';

import { UserService } from 'src/app/components/services/user.service';
import { PartyService } from 'src/app/components/services/party.service';
import { TeamsService } from 'src/app/components/services/teams.service';
import { IParty } from 'src/app/components/models/party';
import { IUser } from 'src/app/components/models/user';
import { ITeam } from 'src/app/components/models/team';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user = {} as IUser;
  public party = {} as IParty;
  public team = {} as ITeam;

  constructor(public _dialog: MatDialog,
              public _User:UserService,
              public _Party:PartyService,
              public _Team:TeamsService,
              private _router: Router) { }

  ngOnInit() {
    this.user.loggedIn = false;
    this.party.loggedIn = false;
    this.team.loggedIn = false;
    this.evaluateTokens();
  }

  evaluateTokens(){
    let user  = localStorage.getItem('user');
    let party = localStorage.getItem('party');
    let team  = localStorage.getItem('team');
    if(!!user){
      this._User.details(user).subscribe(
        data => { console.log('setting user values ');
          this.user = data;
          this.user.loggedIn = true;
          this.team.loggedIn = false;
          this.party.loggedIn = false;
          if (!!party){
            this._Party.details(party).subscribe(
              data => { console.log('setting party values '); 
                this.party = data;
                this.party.loggedIn = true;
                this._router.navigate(['/admin/requestManager']);
              },
              err => console.log('Party details error : ',err)
            );
          } else {
            this._router.navigate(['/admin']);
          }
        },
        err => console.log('User details error : ',err)
      );
    } else if(!!party){
      this._Party.details(party).subscribe(
        data => { console.log('setting party values '); 
          this.party = data;
          this.party.loggedIn = true;
          if(!!team){
            this._Team.details(team).subscribe(
              data => { console.log('setting team values ');
                this.team = data;
                this.team.loggedIn = true;
                this._router.navigate(['/songSearch']);
            },
              err => console.log('Team details error : ',err)
            );
          } else {
            this._router.navigate(['/songSearch']);
          }          
        },
        err => console.log('Party details error : ',err)
      );
      this._router.navigate(['/songSearch']);
    } else {  
      this._router.navigate(['/']);
    }
  }
  // KSJ Button Pressed - open Dialog Box
  openSelectParty(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // initilize data variable here
    dialogConfig.data = { returningUser:false, error:'', logOff:this.user.loggedIn,
                          partyPin:'', teamName:'', teamPin:'',      
                          member1:'', member2:'', member3:'', member4:'',
                          member5:'', member6:'', member7:'', member8:''
    };
    const dialogRef = this._dialog.open(SelectPartyComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data){
          this.evaluateTokens();
        } else {
          if(data.partyID == null){
            localStorage.removeItem('party');
          } else if(data.partyID !==undefined) {
            localStorage.setItem('party', data.partyID)
          }
          if(data.teamID == null){
            localStorage.removeItem('team');
          } else if(data.teamID !==undefined) {
            localStorage.setItem('team', data.teamID)
          }
          if(data.userID !==undefined) {
            localStorage.removeItem('party');
            localStorage.removeItem('team');
            if(data.userID == null){
              localStorage.removeItem('user');
            } else{
              localStorage.setItem('user', data.userID);
            }
          }
          this.evaluateTokens();
        }
      }
    );    
  }
  // Team Button Pressed - open Dialog Box
  openAddTeam(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // initilize data variable here
    console.log('Add Team : ', this.party)
    dialogConfig.data = { error:'', partyID:this.party._id,
                          teamName:'', teamPin:'',      
                          member1:''
    };
    const dialogRef = this._dialog.open(AddTeamComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data){
          this.evaluateTokens();
        } else {
          if(data.partyID !==undefined) localStorage.setItem('party', data.partyID)
          if(data.teamID  !==undefined) localStorage.setItem('team', data.teamID)
          this.evaluateTokens();
        }
      }
    );    
  }
  // Singers Button Pressed - open Dialog Box
  openAddSingers(){ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // initilize data variable here
    dialogConfig.data = { error:'', partyID:this.party._id,
                          teamID:this.team._id,
                          teamName:this.team.teamName,      
                          member1:this.team.singers[0],
                          member2:this.team.singers[1] || null,
                          member3:this.team.singers[2] || null,
                          member4:this.team.singers[3] || null,
                          member5:this.team.singers[4] || null,
                          member6:this.team.singers[5] || null,
                          member7:this.team.singers[6] || null,
                          member8:this.team.singers[7] || null
    };
    const dialogRef = this._dialog.open(AddMemberComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (!data){
          this.evaluateTokens();
        } else {
          console.log(data);
          if(data.partyID == null){
            localStorage.removeItem('party');
          } else if(data.partyID !==undefined) {
            localStorage.setItem('party', data.partyID)
          }
          if(data.teamID == null){
            localStorage.removeItem('team');
          } else if(data.teamID !==undefined) {
            localStorage.setItem('team', data.teamID)
          }
          this.evaluateTokens();
        }
      }
    );    
  }
  // Log Out Button Pressed - open Dialog Box
  openLogOut(){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
  returningUser:false, error:'',selector:9,
  partyPin:'', teamName:'', teamPin:'',      
  member1:'', member2:'', member3:'', member4:'',
  member5:'', member6:'', member7:'', member8:''
  };
  const dialogRef = this._dialog.open(SelectPartyComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(
  data => {
  if (!data){
  this.evaluateTokens();
  } else {
  console.log('Clear Everything : ', data )
  }
  }
  );    
  }
}