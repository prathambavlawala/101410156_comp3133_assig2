import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const ADD_EMPLOYEE_MUTATION = gql`
  mutation AddEmployee(
    $first_name: String!,
    $last_name: String!,
    $email: String!,
    $gender: String!,
    $designation: String!,
    $salary: Int!,
    $date_of_joining: String!,
    $department: String!
  ) {
    addEmployee(
      first_name: $first_name,
      last_name: $last_name,
      email: $email,
      gender: $gender,
      designation: $designation,
      salary: $salary,
      date_of_joining: $date_of_joining,
      department: $department
    ) {
      id
      first_name
      last_name
      email
    }
  }
`;

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <h2 class="title">Add New Employee</h2>

        <div class="form-row" *ngFor="let field of fields">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>{{ field.label }}</mat-label>
            <input
              matInput
              [type]="field.type"
              [formControlName]="field.name"
              [placeholder]="field.placeholder" />
          </mat-form-field>
        </div>

        <div class="text-center mt-3">
          <button mat-raised-button color="accent" type="submit" [disabled]="form.invalid">
            ➕ Add Employee
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 550px;
      margin: 3rem auto;
      padding: 2rem;
      border-radius: 10px;
      background-color: #f7f9fc;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .title {
      text-align: center;
      margin-bottom: 2rem;
      color: #4a90e2;
      font-weight: bold;
    }

    .form-row {
      margin-bottom: 1rem;
    }

    .full-width {
      width: 100%;
    }

    .text-center {
      text-align: center;
    }

    button {
      font-weight: bold;
      padding: 0.6rem 1.5rem;
    }
  `]
})
export class AddEmployeeComponent {
  form: FormGroup;

  fields = [
    { name: 'first_name', label: 'First Name', placeholder: 'Enter first name', type: 'text' },
    { name: 'last_name', label: 'Last Name', placeholder: 'Enter last name', type: 'text' },
    { name: 'email', label: 'Email', placeholder: 'Enter email', type: 'email' },
    { name: 'gender', label: 'Gender', placeholder: 'Enter gender', type: 'text' },
    { name: 'designation', label: 'Designation', placeholder: 'Enter designation', type: 'text' },
    { name: 'salary', label: 'Salary', placeholder: 'Enter salary', type: 'number' },
    { name: 'date_of_joining', label: 'Date of Joining', placeholder: 'YYYY-MM-DD', type: 'text' },
    { name: 'department', label: 'Department', placeholder: 'Enter department', type: 'text' }
  ];

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      designation: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(1000)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const rawValues = this.form.value;

      const variables = {
        ...rawValues,
        salary: Number(rawValues.salary) // Ensure salary is a number
      };

      this.apollo.mutate({
        mutation: ADD_EMPLOYEE_MUTATION,
        variables
      }).subscribe({
        next: () => {
          this.snack.open('✅ Employee added successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/employees']);
        },
        error: err => {
          console.error("❌ GraphQL Error:", err);
          this.snack.open(`❌ ${err.message}`, 'Close', { duration: 3000 });
        }
      });
    }
  }
}
