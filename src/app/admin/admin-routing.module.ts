import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
  { path: 'edit-home', loadChildren: () => import('./edit-home/edit-home.module').then(m => m.EditHomeModule) },
  { path: 'edit-boat-info', loadChildren: () => import('./edit-boat-info/edit-boat-info.module').then(m => m.EditBoatInfoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
