import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MenubarComponent } from './components/menubar/menubar.component';
import { DashboardComponent } from './dashboard.component';
import { IdentityComponent } from './components/identity/identity.component';
import { StudentComponent } from './components/student/student.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { CourseComponent } from './components/course/course.component';
import { ContactComponent } from './components/contact/contact.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MenubarComponent,
    DashboardComponent,
    IdentityComponent,
    StudentComponent,
    CurriculumComponent,
    CourseComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
