import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IApply, ICirculum, ICirculumCourse, IContact, IIdentity, IStudent, IUser } from 'src/app/model';
import { ICourse } from 'src/app/model/ICourse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  apply$: BehaviorSubject<IApply[]> = new BehaviorSubject<IApply[]>(undefined);
  contact$: BehaviorSubject<IContact[]> = new BehaviorSubject<IContact[]>(undefined);
  course$: BehaviorSubject<ICourse[]> = new BehaviorSubject<ICourse[]>(undefined);
  curriculumCourse$: BehaviorSubject<ICirculumCourse[]> = new BehaviorSubject<ICirculumCourse[]>(undefined);
  curriculum$: BehaviorSubject<ICirculum[]> = new BehaviorSubject<ICirculum[]>(undefined);
  identity$: BehaviorSubject<IIdentity[]> = new BehaviorSubject<IIdentity[]>(undefined);
  student$: BehaviorSubject<IStudent[]> = new BehaviorSubject<IStudent[]>(undefined);
  users$: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>(undefined);

  constructor(
    private http: HttpClient
  ) {
    this.http.get<IApply[]>(`${environment.apiUrl}apply.json`).subscribe(applies => {
      this.apply$.next(applies);
    });
    this.http.get<IContact[]>(`${environment.apiUrl}contact.json`).subscribe(contacts => {
      this.contact$.next(contacts);
    });
    this.http.get<ICourse[]>(`${environment.apiUrl}course.json`).subscribe(courses => {
      this.course$.next(courses);
    });
    this.http.get<ICirculumCourse[]>(`${environment.apiUrl}curriculum-course.json`).subscribe(curriculumCourses => {
      this.curriculumCourse$.next(curriculumCourses);
    });
    this.http.get<ICirculum[]>(`${environment.apiUrl}curriculum.json`).subscribe(curriculums => {
      this.curriculum$.next(curriculums);
    });
    this.http.get<IIdentity[]>(`${environment.apiUrl}identity.json`).subscribe(identities => {
      this.identity$.next(identities);
    });
    this.http.get<IStudent[]>(`${environment.apiUrl}students.json`).subscribe(students => {
      this.student$.next(students);
    });
    this.http.get<IUser[]>(`${environment.apiUrl}users.json`).subscribe(users => {
      this.users$.next(users);
    });
  }
}
