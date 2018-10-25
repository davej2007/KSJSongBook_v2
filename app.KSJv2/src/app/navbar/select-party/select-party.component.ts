import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartyService } from 'src/app/components/services/party.service';
import { TeamsService } from 'src/app/components/services/teams.service';
import { UserService } from 'src/app/components/services/user.service';

@Component({
  selector: 'app-select-party',
  templateUrl: './select-party.component.html',
  styleUrls: ['./select-party.component.css']
})
export class SelectPartyComponent implements OnInit {

  data :{ returningUser:boolean, error:string, logOff:boolean,
          partyPin:string, teamName:string, teamPin:string
  };

  constructor(private _Party:PartyService,
              private _Team:TeamsService,
              private _User:UserService,
              private dialogRef : MatDialogRef<SelectPartyComponent>, @Inject(MAT_DIALOG_DATA) data
    ){ this.data = data }
  
  ngOnInit(){}

  onCloseLogIn(){
    if(this.data.logOff){
      this.dialogRef.close({'userID':null, 'teamID':null, 'partyID':null});
    } else if(!this.data.returningUser){
      this._Party.select(this.data).subscribe(
        res => this.dialogRef.close(res),
        err => {
          if (err.status===401){
            this.data.error = err.error;
          } else {
            this.data.error = "Error : Please Make Another Selection.";
          }
        }
      )
    } else {
      if(this.data.teamName.charAt(0)=='$'){
        this._User.select({'teamName':this.data.teamName.slice(1), 'teamPin':this.data.teamPin}).subscribe(
          res => this.dialogRef.close(res),
          err => {
            if (err.status===401){
              this.data.error = err.error;
            } else {
              this.data.error = "Error : Please Make Another Selection.";
            }
          }
        )
      } else {
        this._Team.select(this.data).subscribe(
          res => this.dialogRef.close(res),
          err => {
            if (err.status===401){
              this.data.error = err.error;
            } else {
              this.data.error = "Error : Please Make Another Selection.";
            }
          }
        )
      }
    }
  }
  onCancel(){
    this.dialogRef.close(false);
  }
}