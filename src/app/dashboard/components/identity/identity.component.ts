import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { IField, IIdentity } from 'src/app/model';
import { StateService } from 'src/app/shared/services/state/state.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})
export class IdentityComponent implements OnInit {

  identityId: number;

  @Input() set id(val: number) {
    console.log(val);
    this.fields = [];
    this.identityId = val;
    this.identity = val ? this.stateService.identity$.value.find(i => i.id === val) : this.authService.userValue;
    this.fields = this.tempFields.map(field => {
      field.initialValue = this.identity[field.name];
      return field;
    });
  }

  @Output() update: EventEmitter<any> = new EventEmitter<any>();

  tempFields: IField[] = [
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

  fields: IField[] = [...this.tempFields];

  identity: IIdentity | any;
  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { 
    this.identity = this.identity ?? this.authService.userValue;
    this.fields.forEach(item => {
      item.initialValue = this.identity[item.name as keyof IIdentity];
      item.disabled = this.identityId ? false : !!this.identity.user.type;
    });
  }

  getFormData(event: FormGroup) {
    this.updateRecord(event.getRawValue());
  }

  updateRecord(values: any) {
    const newState: IIdentity[] = this.stateService.identity$.value
      .map(identity => identity.id === this.identityId ? { ...this.identity, ...values } : identity);
    this.stateService.identity$.next(newState);
    this.toastr.success('The identity info saved successfully', 'Success');
    this.update.emit();
  }

}
