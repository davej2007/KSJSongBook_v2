import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';
import { IParty } from '../models/party';
import { IRequest } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private _http:HttpClient) { }

  create(data): Observable<IRequest> {
    return this._http.post<IRequest>('http://localhost:3000/api/request/newRequest', data);
  }

  allRequest(data): Observable<IRequest[]> {
    // data = partyID
    return this._http.get<IRequest[]>('http://localhost:3000/api/request/allRequest/'+data);
  }
}
