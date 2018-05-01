import { Component, ViewChild, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OrderRequest } from '../services/order-request';
import { AppService } from '../services/app.service';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

/**
 * This class represents the lazy loaded ModalComponent.
 */
@Component({
    selector: 'mm-edit-modal',
    templateUrl: 'edit-modal.component.html',
    styleUrls: ['../modal/create-modal.component.css'],
})
export class EditModalComponent implements OnInit {

    userDetails: FormGroup;
    source: LocalDataSource;
    data: any;

    @ViewChild('validationModal')
    modal: EditModalComponent;

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
        this.data = this.appService.getDetails();
        this.userDetails = this.fb.group({
            id:[this.data.id],
            name: [this.data.name],
            username: [this.data.username],
            email: [this.data.email],
            address: [this.data.address]
        });
        this.modal.open(size);
    }
    
    openModal(source) {
      this.source = source;
      this.open('sm');
    }

    onSubmit({ value, valid }: { value: OrderRequest, valid: boolean }) {
        this.edit({ value, valid });
        this.modal.close();
    }

    close() {
        this.modal.close();
    }

    edit({ value, valid }: { value: OrderRequest, valid: boolean }): void {
        let result = JSON.stringify(value);
        if (!result) {
            return;
        }
        this.appService.update(value)
            .then(() => {
              this.source.update(this.data,value);
              this.source.refresh();
              return null;
            });
            //this.source.update(this.data, value); no luck here as well
    }
}
