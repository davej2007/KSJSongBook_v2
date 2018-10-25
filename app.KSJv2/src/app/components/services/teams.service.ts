import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITeam } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private _http:HttpClient) { }
  
  select(data){
    return this._http.post<ITeam>('http://localhost:3000/api/team/returningTeam',data);
  }
  create(data){
    return this._http.post<ITeam>('http://localhost:3000/api/team/newTeam',data);
  }
  details(data){
    return this._http.post<ITeam>('http://localhost:3000/api/team/teamDetails',{_id:data});
  }
  update(data){
    return this._http.post<ITeam>('http://localhost:3000/api/team/teamUpdate',data);
  }
}
