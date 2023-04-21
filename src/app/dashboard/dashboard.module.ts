import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MenubarComponent } from './components/manubar/menubar.component';
import { DashboardComponent } from './dashboard.component';
import { IdentityComponent } from './components/identity/identity.component';


@NgModule({
  declarations: [
    MenubarComponent,
    DashboardComponent,
    IdentityComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
