import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';
import { IParty } from '../models/party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private _http:HttpClient) { }

  create(data): Observable<IParty> {
    return this._http.post<IParty>('http://localhost:3000/api/party/newParty', data);
  }

  select(data): Observable<IParty> {
    return this._http.post<IParty>('http://localhost:3000/api/party/checkParty',data);
  }

  details(data){
    return this._http.post<IParty>('http://localhost:3000/api/party/partyDetails',{_id:data});
  }
}
