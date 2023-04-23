import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IContact, IField, IIdentity } from 'src/app/model';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { StateService } from 'src/app/shared/services/state/state.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  contactId: number;

  @Input() set id(val: number) {
    this.fields = [];
    this.contactId = val;
    console.log(val);
    this.contact = this.stateService.contact$.value.find(c => c.id === val);
    console.log(this.stateService.contact$.value);
    console.log(this.contact);
    this.fields = this.tempFields.map(field => {
      field.initialValue = this.contact[field.name];
      return field;
    });
  }

  @Output() update: EventEmitter<any> = new EventEmitter();

  tempFields: IField[] = [
    {
      name: 'address',
      initialValue: null,
      type: 'text',
      disabled: false,
      validators: [Validators.required]
    },
    {
      name: 'city',
      initialValue: null,
      type: 'text',
      disabled: false,
      validators: [Validators.required]
    },
    {
      name: 'district',
      initialValue: null,
      type: 'text',
      disabled: false,
      validators: [Validators.required]
    },

    {
      name: 'email',
      initialValue: null,
      type: 'email',
      disabled: false,
      validators: [Validators.required, Validators.email]
    },
    {
      name: 'gsm',
      initialValue: null,
      type: 'text',
      disabled: false,
      validators: [Validators.required]
    }
  ];

  fields: IField[] = [...this.tempFields];

  contact: IContact | any;

  constructor(
    private authService: AuthService,
    private stateService: StateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getContactById(this.contactId ?? this.authService.userValue.contactId);
  }
  
  getFormData(event: FormGroup) {
    this.updateRecord(event.getRawValue());
  }

  getContactById(contactId: number) {
    this.contact = this.stateService.contact$.value.find(contact => contact.id === contactId);
    this.fields.forEach(item => {
      item.initialValue = this.contact[item.name as keyof IContact];
    });
  }

  updateRecord(values: any) {
    const newState: IContact[] = this.stateService.contact$.value
      .map(contact => contact.id === this.contact.id ? { ...this.contact, ...values } : contact);
    this.stateService.contact$.next(newState);
    this.toastr.success('The contact info saved successfully', 'Success');
    this.update.emit();
    
  }
  

}
