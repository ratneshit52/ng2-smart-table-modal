import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  submitValue: FormGroup;
  @Output() fieldSearch: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    
   }

  ngOnInit() {
    this.submitValue = this.fb.group({
      userName: [null],
      firstName: [null],
      lastName: [null]
    })
  }

  postValue(fbVal: any): void{
    debugger;
    this.fieldSearch.emit(fbVal);
  }

  onRest(){
    this.fieldSearch.emit(null);
  }
}
