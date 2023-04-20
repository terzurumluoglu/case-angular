import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { IField } from '../../model/IField';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  createReactiveForm(fields: IField[]) {
    const controls: any = this.createFormControls(fields);
    return this.formBuilder.group(controls);
  }

  private createFormControls(fields: IField[]): any {
    return fields.reduce(
      (a: any, b: IField) => ((a[b.name] = new FormControl(b.initialValue, b.validators)), a), {}
    );
  }
}
