import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IContact, IField, IIdentity, IStudent } from 'src/app/model';
import { StateService } from 'src/app/shared/services/state/state.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  buttons: any[] = [
    {
      code: 'identity',
      name: 'Kimlik Bilgisi ',
    },
    {
      code: 'contact',
      name: 'İletişim Bilgisi ',
    },
  ];

  tableData: any[];
  students: any[];

  selectedStudent: any;

  selectedCode: string;
  formName: string;
  buttonText: string;
  fields: IField[];

  constructor(
    private stateService: StateService,
    private toastr: ToastrService
  ) { }

  update() {
    this.getAllStudents();
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.stateService.student$.subscribe((s: any[]) => {
      console.log(s);
      this.students = s.map(student => {
        const identity: IIdentity = this.stateService.identity$.value.find(identity => identity.id === student.identityId);
        student.identity = identity;
        student.contact = identity ? this.stateService.contact$.value.find(contact => contact.id === identity.contactId) : undefined;
        return student;
      });
    });
  }

  getFormData(event: FormGroup) {
    const values: any = event.getRawValue();
    this.updateRecord(values);
  }

  addMockContact(): number {
    const allContacts: IContact[] = this.stateService.contact$.value;
    const id: number = Math.max(...allContacts.map(a => a.id)) + 1;
    const mock:  | any = {...allContacts[0]};
    Object.keys(mock).forEach(key => {
      mock[key] = key === 'id' ? id : '';
    });
    allContacts.push(mock);
    this.stateService.contact$.next(allContacts);
    return id;
  }

  addMockIdentity() {
    const contactId : number = this.addMockContact();
    const allIdentities: IIdentity[] = this.stateService.identity$.value;
    const id: number = Math.max(...allIdentities.map(a => a.id)) + 1;
    const mock:  | any = {...allIdentities[0]};
    Object.keys(mock).forEach(key => {
      if (key === 'id') {
        mock[key] = id; 
      } else if (key === 'contactId') {
        mock[key] = contactId; 
      } else {
        mock[key] = '';
      }
    });
    allIdentities.push(mock);
    this.stateService.identity$.next(allIdentities);
    return id;
  }

  updateRecord(values: any) {
    let allStudents = this.stateService.student$.value;
    if (this.selectedStudent) {
      const { identity, contact, ...others } = this.selectedStudent;
      allStudents = this.stateService.student$.value
        .map(student => student.id === this.selectedStudent.id ? { ...others, ...values } : others);
    } else {
      this.stateService.contact$
      
      const maxId: number = Math.max(...this.stateService.student$.value.map(a => a.id));

      const data = {
        id: maxId + 1,
        studentNo: values.studentNo,
        identityId: this.addMockIdentity(),
        curriculumId: 0
      };

      console.log(data);

      allStudents.push(data);
    }
    this.stateService.student$.next(allStudents);
    this.toastr.success('The Student Info updated Successfully', 'Success');
    this.selectedCode = this.selectedStudent = undefined;
    this.getAllStudents();
  }

  editInfo(student: any, code: string) {
    this.selectedCode = code;
    this.selectedStudent = student;
    if (code === 'student') {
      this.editStudentInfo();
    } else if (code === 'identity') {
      this.editIdentityInfo();
    } else {
      this.editContactInfo();
    }
  }

  editStudentInfo() {
    this.formName = 'Öğrenci Bilgisi Güncelle';
    this.buttonText = 'Güncelle';
    this.fields = [
      {
        name: 'studentNo',
        disabled: false,
        initialValue: this.selectedStudent?.studentNo ?? null,
        type: 'text',
        validators: [Validators.required]
      }
    ];
  }

  editIdentityInfo() {
    this.formName = 'Öğrenci Kimlik Bilgisi Güncelle';
    this.buttonText = 'Güncelle';
    this.fields = [
      {
        name: 'studentNo',
        disabled: false,
        initialValue: this.selectedStudent.studentNo ?? null,
        type: 'text',
        validators: [Validators.required]
      }
    ];
  }

  editContactInfo() {
    this.formName = 'Öğrenci İletişim Bilgisi Güncelle';
    this.buttonText = 'Güncelle';
    this.fields = [
      {
        name: 'studentNo',
        disabled: false,
        initialValue: this.selectedStudent.studentNo ?? null,
        type: 'text',
        validators: [Validators.required]
      }
    ];
  }

}
