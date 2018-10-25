import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPartyComponent } from './components/pages/admin/new-party/new-party.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { AdminNavbarComponent } from './components/pages/admin/admin-navbar/admin-navbar.component';
import { AdminIntroComponent } from './components/pages/admin/admin-intro/admin-intro.component';
import { ImportCsvComponent } from './components/pages/admin/import-csv/import-csv.component';
import { RequestManagerComponent } from './components/pages/admin/request-manager/request-manager.component';
import { SongTableComponent } from './components/pages/songTable/song-table/song-table.component';

const routes: Routes = [
  { path:'', component:WelcomeComponent},
  { path:'songSearch', component:SongTableComponent},
  { path:'admin', component: AdminNavbarComponent, children: [
      {path:'',component:AdminIntroComponent},
      {path:'newParty', component:NewPartyComponent},
      {path:'csvUpload', component:ImportCsvComponent},
      {path:'requestManager', component:RequestManagerComponent}
  ]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
