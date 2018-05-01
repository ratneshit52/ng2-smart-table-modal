import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from '../home/home.component';
import { AppComponent }      from './app.component';
import { NavigateComponent } from '../nav/navigate.component';

const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'app', component: AppComponent },
  { path: 'nav', component: NavigateComponent},
  { path: '', redirectTo: '/nav', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}