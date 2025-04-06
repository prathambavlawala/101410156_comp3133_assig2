import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeListComponent } from './employees/employee-list.component';

// Lazy load standalone components
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  { path: 'employees', loadComponent: () => import('./employees/employee-list.component').then(m => m.EmployeeListComponent) },
  { path: 'add', loadComponent: () => import('./employees/add-employee/add-employee.component').then(m => m.AddEmployeeComponent) },
  { path: 'edit/:id', loadComponent: () => import('./employees/edit-employee/edit-employee.component').then(m => m.EditEmployeeComponent) },
  { path: 'view/:id', loadComponent: () => import('./employees/view-employee/view-employee.component').then(m => m.ViewEmployeeComponent) }
];
