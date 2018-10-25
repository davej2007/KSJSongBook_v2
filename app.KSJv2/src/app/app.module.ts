import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//   Material Module's
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
// Components
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { SelectPartyComponent } from './navbar/select-party/select-party.component';
import { AdminNavbarComponent } from './components/pages/admin/admin-navbar/admin-navbar.component';
import { AddTeamComponent } from './navbar/add-team/add-team.component';
import { AddMemberComponent } from './navbar/add-member/add-member.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { AdminIntroComponent } from './components/pages/admin/admin-intro/admin-intro.component';
import { NewPartyComponent } from './components/pages/admin/new-party/new-party.component';
import { ImportCsvComponent } from './components/pages/admin/import-csv/import-csv.component';
import { RequestManagerComponent } from './components/pages/admin/request-manager/request-manager.component';
import { MakeRequestComponent } from './components/pages/songTable/make-request/make-request.component';
import { SongTableComponent } from './components/pages/songTable/song-table/song-table.component';

// Services
import { PartyService } from './components/services/party.service';
import { TeamsService } from './components/services/teams.service';
import { UserService } from './components/services/user.service';
import { SongService } from './components/services/song.service';
import { RequestService } from './components/services/request.service';
import { SelectTeamComponent } from './components/pages/songTable/select-team/select-team.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SelectPartyComponent,
    WelcomeComponent,
    NewPartyComponent,
    AdminNavbarComponent,
    AdminIntroComponent,
    AddTeamComponent,
    AddMemberComponent,
    ImportCsvComponent,
    RequestManagerComponent,
    MakeRequestComponent,
    SongTableComponent,
    SelectTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
// Material Modules
    MatButtonModule,MatToolbarModule,MatIconModule,
    MatDialogModule,MatFormFieldModule,MatInputModule,MatSelectModule,
    MatCheckboxModule,MatCardModule,
    MatTableModule, MatPaginatorModule, MatSortModule
  ],  
  entryComponents : [SelectPartyComponent, AddTeamComponent, AddMemberComponent, MakeRequestComponent, SelectTeamComponent],
  providers: [PartyService, TeamsService, UserService, SongService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
