import {Component, NgModule, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Ng2SmartTableModule, ServerDataSource, LocalDataSource } from 'ng2-smart-table';
import {AppService} from '../services/app.service';
import { CreateModalComponent } from '../modal/create-modal.component';
import { EditModalComponent } from '../edit/edit-modal.component';
import { BsModalModule } from 'ng2-bs3-modal';
import { FilterComponent } from "../filter/filter.component"
import {ButtonRenderComponent} from '../button/button-render.component';
import {ImageRenderComponent} from '../services/image-render.component';
import {OrderRequest} from '../services/order-request';
declare const $;

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit, AfterViewInit {
  source: LocalDataSource;
  orderRequests: OrderRequest[];
  customers: FormGroup;
  hideColCount: any;
  url: string = "https://cbseventmanagement-api-dot-thermal-wonder-200107.appspot.com/api/User/Get";
  
  @ViewChild(CreateModalComponent)
  modalHtml: CreateModalComponent;

  @ViewChild(EditModalComponent)
  modalHtml1: EditModalComponent;
  
  settings = {
    mode: 'external',
    "actions": {
        "add": true,
        "position": "right"
    },
    "edit": {
        "inputClass": "form-control input-sm",
        "editButtonContent": "<img src='../../../../assets/images/edit.png'>",
        "saveButtonContent": "<i class='glyphicon glyphicon-ok' aria-hidden='true'></i>",
        "cancelButtonContent": "<i class='glyphicon glyphicon-remove' aria-hidden='true'></i>",
        "confirmSave": true
    },
    "delete": {
        "deleteButtonContent": "<img src='../../../../assets/images/delete.png'>",
        "confirmDelete": true
    },
    "add": {
        "inputClass": "form-control input-sm",
        "addButtonContent": "<label class='label label-info'>Create User</label>",
        "createButtonContent": "<i class='glyphicon glyphicon-pencil' aria-hidden='true'></i>",
        "cancelButtonContent": "<i class='glyphicon glyphicon-remove' aria-hidden='true'></i>",
        "confirmCreate": true
    },
    "columns": {
        "userName": {
            "title": "AD ID",
        },
        "firstName": {
            "title": "FIRST NAME"
        },
        "lastName": {
            "title": "LAST NAME"
        },
        "userRole": {
            "title": "ROLE"
      },
      "stationList": {
        "title": "STATIONS",
        "class": "stationClass"
      }
    },
    "orderby": {
        "title": "userName",
        "filter": true
    },
    "filter": false,
    "attr": {
        "class": "table table-striped table-bordered table-font-normal"
    }
};

  constructor(private appService: AppService, private fb: FormBuilder, private http: Http) {
    this.source  = new LocalDataSource();
    this.appService.getAllData(this.url).toPromise().then((data: any) => {
      console.log(data);
      debugger;
      this.source.load(data);
      this.source.reset();
      this.tableColHide(this.hideColCount);
    })
  }
  

  ngAfterViewInit(){
    this.hideColumn("stationClass");
  }

  hideColumn(className: string){
    let machCount = [];
    let colCount = 0;
    $('ng2-smart-table table tr:nth-child(1) th').each(function () {
        console.log($(this).hasClass(className));
        if ($(this).attr('colspan')) {
            colCount += +$(this).attr('colspan');
            if($(this).hasClass(className)){
                machCount.push(colCount);
            }
        } else {
            colCount++;
            if($(this).hasClass(className)){
                machCount.push(colCount);
            }
        }

    });
    this.hideColCount = machCount;
  }

  tableColHide(hideVal: any[]){
    for(let i = 0; i < hideVal.length; i++){
        $('ng2-smart-table thead th:nth-child('+ hideVal[i] +')').css('display', 'none');
        $('ng2-smart-table tbody td:nth-child('+ hideVal[i] +')').css('display', 'none');
    }
  }
  
  ngOnInit() {
    this.customers = this.fb.group({
      userName: [''],
      firstName: [''],
      lastName: [''],
      userRole: [''],
      stations: ['']
    });
  }
  
  onSearch(query: any) {
    console.log(query);
    debugger;
    if(!query){
      this.source.setFilter([])
    } else {
          this.source.setFilter([
              {
                  field: 'userName',
                  search: query.userName ? query.userName : ""
              },
              {
                  field: 'firstName',
                  search: query.firstName ? query.firstName : ""
              },
              {
                  field: 'lastName',
                  search: query.lastName ? query.lastName : ""
              },
              {
                  field: 'userRole',
                  search: query.userRole ? query.userRole : ""
              }
          ], false,
        );
      }
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