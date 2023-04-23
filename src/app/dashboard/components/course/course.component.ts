import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IField } from 'src/app/model';
import { ICourse } from 'src/app/model/ICourse';
import { StateService } from 'src/app/shared/services/state/state.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  formName: string = 'Kaydet';

  courses: ICourse[];

  buttons: any[] = [
    {
      code: 'update',
      name: 'Update',
      fn: undefined
    },
    {
      code: 'delete',
      name: 'Delete',
      fn: undefined
    }
  ];

  tempFields: IField[] = [
    {
      name: 'courseCode',
      disabled: false,
      type: 'text',
      initialValue: null,
      validators: [Validators.required]
    },
    {
      name: 'courseName',
      disabled: false,
      type: 'text',
      initialValue: null,
      validators: [Validators.required]
    },
    {
      name: 'status',
      disabled: false,
      type: 'checkbox',
      initialValue: null,
      validators: [Validators.required]
    },
    {
      name: 'credit',
      disabled: false,
      type: 'text',
      initialValue: null,
      validators: [Validators.required]
    }
  ];

  fields: IField[] = [...this.tempFields];
  
  selectedCourse: ICourse;
  showForm: boolean = false;

  constructor(
    private stateService: StateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.stateService.course$.subscribe(p => {
      this.courses = p;
    })
  }

  update(course: ICourse, code: string) {
    if (code === 'delete') {
      this.courses = this.courses.filter(c => c.id !== course.id);
    } else {
      this.fields = [];
      this.selectedCourse = course;
      this.formName = 'Güncelle';
      this.fields = this.tempFields.map(field => {
        field.initialValue = course[field.name as keyof ICourse];
        return field;
      });
    }
  }

  add() {
    this.selectedCourse = undefined;
  }

  getFormData(event: FormGroup) {
    this.updateRecord(event.getRawValue());
  }

  updateRecord(values: any) {
    
    if (this.selectedCourse) {
      
      this.courses = this.courses
        .map(course => course.id === this.selectedCourse.id ? { ...course, ...values } : course);
    } else {
      this.stateService.contact$

      const maxId: number = Math.max(...this.courses.map(a => a.id));

      const data: ICourse = {
        id: maxId + 1,
        ...values
      };

      this.courses.push(data);
    }
    this.stateService.course$.next(this.courses);
    this.toastr.success('The Course updated Successfully', 'Success');
    this.selectedCourse = undefined;
    this.showForm = false;
  }

}
