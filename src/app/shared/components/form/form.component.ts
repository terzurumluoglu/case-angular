import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormService } from '../../services/form/form.service';
import { FormGroup } from '@angular/forms';
import { IField } from 'src/app/model/IField';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Input() formName: string;

  @Input() buttonText: string = 'Save';
  
  @Input() set fields(val: IField[]) {
    this.form = undefined;
    this.formFields = val;
    this.createForm(val);
  }

  @Output() sendFormData = new EventEmitter();

  form: FormGroup;
  formFields: IField[];

  constructor(
    private formService: FormService
  ) { }

  isButtonHidden() {
    return this.formFields.every(field => field.disabled);
  }

  createForm(fields: IField[]) {
    this.form = this.formService.createReactiveForm(fields);
  }

  submit() {
    this.sendFormData.emit(this.form);
  }

}
