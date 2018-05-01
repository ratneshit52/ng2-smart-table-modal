import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AppService} from '../services/app.service';
import {ModalComponent} from '../modal/modal.component';
import {OrderRequest} from '../services/order-request';

@Component({
  selector: 'my-home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  orderRequests: OrderRequest[];
  customers: FormGroup;
  @ViewChild(ModalComponent)
  modal: ModalComponent;

  constructor(private appService: AppService, private fb: FormBuilder) {
    this.getOrderRequests();
  }
  
  ngOnInit() {
    this.customers = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      address: ['']
    });
  }
  
  getOrderRequests() {
      this.appService.getOrderRequests()
          .then((orderRequests) => {
              this.orderRequests = orderRequests;
          });
    }
    
    open(){
      this.modal.open();
    }
}