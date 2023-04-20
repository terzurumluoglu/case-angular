import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IField } from '../../model/IField';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  createReactiveForm(fields: IField[]) {
    return fields.reduce(
      (a: any, b: IField) => ((a[b.name] = new FormControl(b.initialValue, b.validators)), a), {}
    );
  }
}
