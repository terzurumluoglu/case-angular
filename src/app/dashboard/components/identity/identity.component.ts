import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IField, IIdentity } from 'src/app/model';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  fields: IField[] = [
    {
      name: 'tc',
      disabled: true,
      initialValue: null,
      type: 'text',
      validators: [Validators.required]
    },
    {
      name: 'name',
      disabled: true,
      initialValue: null,
      type: 'text',
      validators: [Validators.required]
    },
    {
      name: 'surname',
      disabled: true,
      initialValue: null,
      type: 'text',
      validators: [Validators.required]
    },
    {
      name: 'bornCity',
      disabled: true,
      initialValue: null,
      type: 'text',
      validators: [Validators.required]
    },
    {
      name: 'bornDate',
      disabled: true,
      initialValue: null,
      type: 'text',
      validators: [Validators.required]
    },
  ];

  identity: IIdentity | any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.identity = this.authService.userValue;
    this.fields.forEach(item => {
      item.initialValue = this.identity[item.name];
    })
  }

}
