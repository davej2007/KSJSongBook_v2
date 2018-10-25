import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ISong } from '../../../models/song';
import { SongService } from '../../../services/song.service';
import { PartyService } from '../../../services/party.service';
import { MakeRequestComponent } from '../make-request/make-request.component';
import { SelectTeamComponent } from '../select-team/select-team.component';

@Component({
  selector: 'app-song-table',
  templateUrl: './song-table.component.html',
  styleUrls: ['./song-table.component.css']
})
export class SongTableComponent implements OnInit {
  displayedColumns: string[] = [ 'title', 'artist', 'request'];
  dataSource: MatTableDataSource<ISong>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  private party;
  message : string = '';

  constructor(
      private _dialog: MatDialog,
      private _songs:SongService,
      private _party:PartyService,
      private _router:Router) {}

  ngOnInit() { 
    this.party = localStorage.getItem('party');
    if(this.party){
      this._party.details(this.party).subscribe(
        res => {
          this._songs.getSongs(res.christmas).subscribe(
            data => { this.dataSource = new MatTableDataSource(data);
                      this.dataSource.paginator = this.paginator;
                      this.dataSource.sort = this.sort;
            }
          );    
        },
        err => console.log(err)
      )
    } else {
      this._router.navigate(['/'])
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  makeARequest(requestID){
    let team = localStorage.getItem('team');
    if (!team){
      console.log('opening select team');
      this.openSelectTeamModal();
    } else {
      console.log('opening select singers');
      this.openSelectSingersModal();
    }  
    
  }

  openSelectTeamModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // initilize data variable here
    dialogConfig.data = { error:'', partyID:'partyID HEre',
                          teamName:'', teamPin:'',      
                          member1:''
    };
    const dialogRef = this._dialog.open(SelectTeamComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {console.log(data)},
      err => {console.log(err)}
    );
  }
  
  openSelectSingersModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // initilize data variable here
    dialogConfig.data = { error:'', partyID:'partyID HEre',
                          teamName:'', teamPin:'',      
                          member1:''
    };
    const dialogRef = this._dialog.open(MakeRequestComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {console.log(data)},
      err => {console.log(err)}
    );    
  }
  
}