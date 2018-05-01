import { Component, ViewChild, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OrderRequest } from '../services/order-request';
import { AppService } from '../services/app.service';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'mm-create-modal',
    templateUrl: 'create-modal.component.html',
    styleUrls: ['create-modal.component.css']
})
export class CreateModalComponent implements OnInit {

    orderRequests: OrderRequest[] = [];
    userDetails: FormGroup;
    source: LocalDataSource;
    @Input() orderRequest: OrderRequest;

    @ViewChild('validationModal')
    modal: CreateModalComponent;

    constructor(
        private fb: FormBuilder,
        private appService: AppService
    ) {
     }

    ngOnInit(): void {
        this.userDetails = this.fb.group({
            id: [''],
            name: [''],
            username: [''],
            email: [''],
            address: ['']
        });
    }

    open(size: string) {
        this.modal.open(size);
    }
    
    openModal(source) {
      this.source = source;
      this.open('sm');
    }

    onSubmit({ value, valid }: { value: OrderRequest, valid: boolean }) {
        this.add({ value, valid });
        this.modal.close();
    }

    close() {
        this.modal.close();
    }

    add({ value, valid }: { value: OrderRequest, valid: boolean }): void {
        let result = JSON.stringify(value);
        if (!result) {
            return;
        }
        this.appService.create(value)
            .then(orderRequest => {
                this.orderRequests.push(orderRequest);
                this.source.add(orderRequest);
                this.source.refresh();
            });
    }
}
