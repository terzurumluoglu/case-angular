import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormService } from '../../services/form.service';
import { FormGroup } from '@angular/forms';
import { IField } from 'src/app/model/IField';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Input() formName?: string;
  
  @Input() set fields(val: IField[]) {
    this.formFields = val;
    this.createForm(val);
  }

  @Output() sendFormData = new EventEmitter();

  form!: FormGroup;
  formFields!: IField[];

  constructor(
    private formService: FormService
  ) { }

  createForm(fields: IField[]) {
    this.form = this.formService.createReactiveForm(fields);
  }

  submit() {
    this.sendFormData.emit(this.form);
  }

}
