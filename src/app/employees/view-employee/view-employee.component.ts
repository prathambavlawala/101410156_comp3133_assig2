import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

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

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  template: `
    <mat-card *ngIf="employee" class="employee-card">
      <h2 class="name">{{ employee.first_name }} {{ employee.last_name }}</h2>
      <div class="detail">
        <strong>Email:</strong> {{ employee.email }}
      </div>

      <div class="button-group">
        <button mat-raised-button color="primary" (click)="goBack()">⬅ Back to List</button>
      </div>
    </mat-card>
  `,
  styles: [`
    .employee-card {
      max-width: 500px;
      margin: 3rem auto;
      padding: 2rem;
      background-color: #f9f9f9;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .name {
      text-align: center;
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #3f51b5;
    }

    .detail {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
    }

    .button-group {
      text-align: center;
    }

    button {
      font-weight: bold;
    }
  `]
})
export class ViewEmployeeComponent {
  employee: any;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private apollo = inject(Apollo);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apollo.query({
        query: GET_EMPLOYEE_QUERY,
        variables: { id }
      }).pipe(map((res: any) => res.data.employeeById))
        .subscribe(employee => {
          this.employee = employee;
        });
    }
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
