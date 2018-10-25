import { Component, OnInit } from '@angular/core';
import { PartyService } from '../../../services/party.service';

@Component({
  selector: 'app-new-party',
  templateUrl: './new-party.component.html',
  styleUrls: ['./new-party.component.css']
})
export class NewPartyComponent implements OnInit {
  data = {
    _id:'',
    partyName:'', partyDate:'', partyType:'',
    christmas:false, description:'',
    error:''};
  constructor(private _party:PartyService) { }

  ngOnInit() {
  }
  onSave(){
    console.log('save ', this.data);
    this._party.create(this.data).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
