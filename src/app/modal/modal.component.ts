import { Component, ViewChild, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'mm-modal',
    templateUrl: 'modal.component.html'
})
export class ModalComponent {

    @ViewChild('modal')
    modal: ModalComponent;

    open() {
        this.modal.open();
    }

    close() {
        this.modal.close();
    }
}
