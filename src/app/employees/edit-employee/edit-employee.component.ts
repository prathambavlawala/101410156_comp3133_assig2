import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Apollo, gql } from 'apollo-angular';

const GET_EMPLOYEE_QUERY = gql`
  query GetEmployee($id: String!) {
    employeeById(id: $id) {
      id
      first_name
      last_name
      email
    }
  }
`;

const UPDATE_EMPLOYEE_MUTATION = gql`
  mutation UpdateEmployee($id: String!, $first_name: String!, $last_name: String!, $email: String!) {
    updateEmployee(id: $id, first_name: $first_name, last_name: $last_name, email: $email) {
      id
      first_name
      last_name
      email
    }
  }
`;

@Component({
  selector: 'app-edit-employee',
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
        <h2 class="text-center">Edit Employee</h2>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>First Name</mat-label>
          <input matInput formControlName="first_name" />
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="last_name" />
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" />
        </mat-form-field>

        <div class="text-center">
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Update</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .full-width {
      width: 100%;
    }
    .text-center {
      text-align: center;
    }
  `]
})
export class EditEmployeeComponent implements OnInit {
  form: FormGroup;
  employeeId!: string;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEE_QUERY,
      variables: { id: this.employeeId }
    }).valueChanges.subscribe(({ data }) => {
      if (data?.employeeById) {
        this.form.patchValue(data.employeeById);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.apollo.mutate({
        mutation: UPDATE_EMPLOYEE_MUTATION,
        variables: {
          id: this.employeeId,
          ...this.form.value
        }
      }).subscribe({
        next: () => {
          this.snack.open('Employee updated successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/employees']);
        },
        error: err => {
          this.snack.open(err.message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}
