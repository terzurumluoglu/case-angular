import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IField } from 'src/app/model/IField';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formName: string = 'Sign In';

  fields: IField[] = [
    {
      name: 'username',
      initialValue: null,
      validators: [Validators.required],
      type: 'text'
    },
    {
      name: 'password',
      initialValue: null,
      validators: [Validators.required],
      type: 'password'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  getFormData(event: FormGroup) {
    console.log(event);
  }
}
