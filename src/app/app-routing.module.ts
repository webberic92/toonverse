import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { MintComponent } from './components/mint/mint.component';
import { RoadMapComponent } from './components/road-map/road-map.component';
import { TeamComponent } from './components/team/team.component';
import { NFTComponent } from './components/nft/nft.component';
import { AboutComponent } from './components/about/about.component';
import { ViewcatzComponent } from './components/viewcatz/viewcatz.component';
import { AccountComponent } from './components/account/account.component';
const routes: Routes = [

  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'manage', pathMatch: 'full', component: ManageComponent },
  { path: 'roadmap', pathMatch: 'full', component: RoadMapComponent },
  { path: 'team', pathMatch: 'full', component: TeamComponent },
  { path: 'mint', pathMatch: 'full', component: MintComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'viewcatz', pathMatch: 'full', component: ViewcatzComponent },
  { path: 'nft', pathMatch: 'full', component: NFTComponent },
  { path: 'account', pathMatch: 'full', component: AccountComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
