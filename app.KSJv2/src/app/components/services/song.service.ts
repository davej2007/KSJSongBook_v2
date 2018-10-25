import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';
import { ISong } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private _http: HttpClient) { }
  
  getSongs(xmas): Observable<ISong[]> {
    return this._http.get<ISong[]>('http://localhost:3000/api/song/allSongs/'+xmas);
  }
  getCSVSongs(): Observable<ISong[]> {
    return this._http.get<ISong[]>('http://localhost:3000/api/song/importCsv');
  }
  newSong(song): Observable<ISong[]> {
    return this._http.post<ISong[]>('http://localhost:3000/api/song/newSong', song);
  }
}