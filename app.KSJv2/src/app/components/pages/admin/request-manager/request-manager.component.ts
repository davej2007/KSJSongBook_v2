import { Component, OnInit } from '@angular/core';
import { IRequest } from '../../../models/request';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-request-manager',
  templateUrl: './request-manager.component.html',
  styleUrls: ['./request-manager.component.css']
})
export class RequestManagerComponent implements OnInit {
  // public user = {} as IUser;
  // public party = {} as IParty;
  // public team = {} as ITeam;
  public request = {} as IRequest;
  public allRequests = [];
  
  constructor(private _Request:RequestService) { }
  ngOnInit() {
    let partyID=localStorage.getItem('party');
    this._Request.allRequest(partyID).subscribe(
      data => {
       this.allRequests = data;   
      console.log('All Request Data : ', data); 
      },
      err => console.log('Party details error : ',err)
    );
  }

}
