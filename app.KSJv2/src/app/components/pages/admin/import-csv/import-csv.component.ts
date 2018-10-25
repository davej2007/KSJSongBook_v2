import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../services/song.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.css']
})
export class ImportCsvComponent implements OnInit {
  public showTable = false;
  public importedsongs = [];

  constructor(private _songs:SongService,
    private _router:Router) { }

  ngOnInit() {
  }

  importCSV(){
    this._songs.getCSVSongs().subscribe(
      res => { this.importedsongs = res;
                this.showTable = true; },     
      err => { console.log(err); }
    );        
    
  }

  saveCSV(){
    this.importedsongs.forEach(song=>{
      console.log(song);
      this._songs.newSong(song).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    });
    this._router.navigate(['/songMaster']);
  };
}

