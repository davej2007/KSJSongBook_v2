import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamsService } from 'src/app/components/services/teams.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  data :{ error:string, partyID:string, 
          teamName:string, teamPin:string,      
          member1:string
  };

  constructor(  private _Team:TeamsService,
                private dialogRef : MatDialogRef<AddTeamComponent>, @Inject(MAT_DIALOG_DATA) data
    ){ this.data = data }

  ngOnInit(){
  }

  onCloseTeam(){
    this._Team.create(this.data).subscribe(
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

  onCancel(){
    this.dialogRef.close(false);
  }
}