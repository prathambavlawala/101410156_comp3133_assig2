import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
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
    <div class="login-wrapper">
      <div class="text-center">
        <h2>Login</h2>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput placeholder="Email" formControlName="email">
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Password</mat-label>
          <input matInput type="password" placeholder="Password" formControlName="password">
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Login</button>
      </form>

      <div class="text-center mt">
        <p>Don't have an account? <a routerLink="/signup">Sign up</a></p>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
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
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.auth.login(email, password).subscribe({
        next: (res) => {
          this.auth.saveToken(res.token);
          this.snack.open('Login successful', 'Close', { duration: 3000 });
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.snack.open('Invalid login credentials', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
