import { ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent) },
  { path: 'employees', loadComponent: () => import('./employees/employee-list.component').then(m => m.EmployeeListComponent) },
  { path: 'add', loadComponent: () => import('./employees/add-employee/add-employee.component').then(m => m.AddEmployeeComponent) },
  { path: 'edit/:id', loadComponent: () => import('./employees/edit-employee/edit-employee.component').then(m => m.EditEmployeeComponent) },
  { path: 'view/:id', loadComponent: () => import('./employees/view-employee/view-employee.component').then(m => m.ViewEmployeeComponent) }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule
    ),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({ uri: 'https://pratham-comp3133-101410156-assignment1.onrender.com/' })
      };
    })
  ]
};
