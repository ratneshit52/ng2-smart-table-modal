import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NavigateComponent} from './nav/navigate.component';
import {AppComponent} from './app-root/app.component';
import {AppRoutingModule} from './app-root/app-routing.module';
import {AppService} from './services/app.service';
import {CreateModalComponent} from './modal/create-modal.component';
import {EditModalComponent} from './edit/edit-modal.component';
import {HomeComponent} from './home/home.component';
import {ModalComponent} from './modal/modal.component';

import {Ng2SmartTableModule} from 'ng2-smart-table';

import { BsModalModule } from 'ng2-bs3-modal';

import{ButtonRenderComponent} from './button/button-render.component';
import {ImageRenderComponent} from './services/image-render.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  imports: [ BrowserModule,
  Ng2SmartTableModule,
  AppRoutingModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  BsModalModule ],
  declarations: [ AppComponent,
  HomeComponent,
  ModalComponent,
  CreateModalComponent,
  EditModalComponent,
  NavigateComponent,
  ButtonRenderComponent,
  ImageRenderComponent,
  FilterComponent],
  entryComponents: [
    ButtonRenderComponent, 
    ImageRenderComponent],
  bootstrap: [ NavigateComponent ],
  providers: [AppService]
})
export class AppModule {}