import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  select(data){
    return this._http.post<IUser>('http://localhost:3000/api/user/logInUser', data);
  }

  create(data){
    return this._http.post<IUser>('http://localhost:3000/api/user/newUser',data);
  }

  details(data){
    return this._http.post<IUser>('http://localhost:3000/api/user/userDetails',{_id:data});
  }
}
