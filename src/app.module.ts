import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { TeamComponent } from './app/components/team/team.component';
import { RoadMapComponent } from './app/components/road-map/road-map.component';
import { NavbarComponent } from './app/components/navbar/navbar.component';
import { FooterComponent } from './app/components/footer/footer.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { StoreModule } from '@ngrx/store';
import { addressReducer } from './app/store/reducers';
import { HomeComponent } from './app/components/home/home.component';
import { MintComponent } from './app/components/mint/mint.component';
import { ManageComponent } from './app/components/manage/manage.component';
import { NFTComponent } from './app/components/nft/nft.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TeamComponent,
    RoadMapComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MintComponent,
    ManageComponent,
    NFTComponent,
  ],
  imports: [
    StoreModule.forRoot({ address: addressReducer }),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MdbCollapseModule,
    MdbFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
