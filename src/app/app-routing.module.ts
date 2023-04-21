import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: async () => (await import('./auth/auth.module')).AuthModule
  },
  {
    path: 'dashboard',
    loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
