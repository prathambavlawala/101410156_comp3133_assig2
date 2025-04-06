import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

@Component({
  selector: 'app-signup',
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
    <div class="signup-wrapper">
      <div class="text-center">
        <h2>Signup</h2>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Username</mat-label>
          <input matInput placeholder="Username" formControlName="username">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput placeholder="Email" formControlName="email">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Password</mat-label>
          <input matInput type="password" placeholder="Password" formControlName="password">
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Signup</button>
      </form>

      <div class="text-center mt">
        <p>Already have an account? <a routerLink="/login">Login</a></p>
      </div>
    </div>
  `,
  styles: [`
    .signup-wrapper {
      max-width: 400px;
      margin: 4rem auto;
      padding: 2rem;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      background-color: #fff;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .full-width {
      width: 100%;
    }

    .text-center {
      text-align: center;
    }

    .mt {
      margin-top: 1rem;
    }
  `]
})
export class SignupComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.apollo.mutate({
        mutation: SIGNUP_MUTATION,
        variables: this.form.value
      }).subscribe({
        next: () => {
          this.snack.open('Signup successful', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.snack.open(err.message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}
