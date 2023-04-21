import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { IdentityComponent } from './components/identity/identity.component';
import { StudentComponent } from './components/student/student.component';
import { ContactComponent } from './components/contact/contact.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { CourseComponent } from './components/course/course.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'identity',
    component: IdentityComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'curriculum',
    component: CurriculumComponent
  },
  {
    path: 'course',
    component: CourseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
