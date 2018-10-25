import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamsService } from 'src/app/components/services/teams.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  data :{ error:string, partyID:string, 
          teamName:string, teamPin:string,      
          member1:string, member2:string, member3:string, member4:string,
          member5:string, member6:string, member7:string, member8:string
  };

  constructor(  private _Team:TeamsService,
                private dialogRef : MatDialogRef<AddMemberComponent>, @Inject(MAT_DIALOG_DATA) data
    ){ this.data = data }

  ngOnInit(){}
  onCloseSinger(){
    this._Team.update(this.data).subscribe(
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