import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Ng2SmartTableModule, ServerDataSource } from 'ng2-smart-table';
import {AppService} from '../services/app.service';
import { CreateModalComponent } from '../modal/create-modal.component';
import { EditModalComponent } from '../edit/edit-modal.component';
import { BsModalModule } from 'ng2-bs3-modal';
import {ButtonRenderComponent} from '../button/button-render.component';
import {ImageRenderComponent} from '../services/image-render.component';
import {OrderRequest} from '../services/order-request';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit {
  source: ServerDataSource;
  orderRequests: OrderRequest[];
  customers: FormGroup;
  url: string = "http://localhost:3000/dataContent";
  
  @ViewChild(CreateModalComponent)
  modalHtml: CreateModalComponent;

  @ViewChild(EditModalComponent)
  modalHtml1: EditModalComponent;
  
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Actions'
    },
  columns: {
    id: {
      title: 'ID',
      filter: false
    },
    name: {
      title: 'Name',
      filter: false
    },
    username: {
      title: 'User Name',
      filter: false
    },
    email: {
      title: 'Email',
      filter: false
    },
    address: {
      title: 'Address',
      filter: false
    },
    phone: {
      title: 'Phone',
      filter: false
    },
    website: {
      title: 'Website',
      filter: false
    },
    company: {
      title: 'Copmany',
      filter: false
    }
  }
};

  constructor(private appService: AppService, private fb: FormBuilder, private http: Http) {
    this.source  = new ServerDataSource(http, { endPoint: this.url})
    this.getOrderRequests();
  }
  
  ngOnInit() {
    this.customers = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      address: [''],
      phone: [''],
      website: [''],
      company: ['']
    });
  }
  
  onSearch(query: string = '') {
        this.source.setFilter([
            // fields we want to include in the search
            {
                field: 'name',
                search: query
            },
            {
                field: 'username',
                search: query
            },
            {
                field: 'email',
                search: query
            }
        ], false);
    }
  
  getOrderRequests() {
        this.appService.getOrderRequests()
            .then((orderRequests) => {
                this.orderRequests = orderRequests;
                this.source.load(orderRequests);
            });
    }
    
    onCreate(event: any) {
        this.modalHtml.openModal(this.source);
    }

    onDelete(orderRequest: any) {
        this.appService.delete(orderRequest.data)
        .then(() => {
            this.orderRequests = this.orderRequests;
        });
        this.source.remove(orderRequest.data);
    }

    onSave(event: any) {
        this.appService.setDetails(event.data);
        this.modalHtml1.openModal(this.source);
    }
}