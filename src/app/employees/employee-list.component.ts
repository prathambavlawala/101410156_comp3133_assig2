import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      first_name
      last_name
      email
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation($id: String!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <div class="container">
      <h2 class="title">Employees List</h2>

      <div class="button-wrapper">
        <button mat-raised-button class="green-btn" (click)="onAddEmployee()"> Add Employee</button>
      </div>

      <table mat-table [dataSource]="employees" class="mat-elevation-z8 full-width" *ngIf="employees.length > 0; else noData">

        <ng-container matColumnDef="first_name">
          <th mat-header-cell *matHeaderCellDef>First Name</th>
          <td mat-cell *matCellDef="let employee">{{ employee.first_name }}</td>
        </ng-container>

        <ng-container matColumnDef="last_name">
          <th mat-header-cell *matHeaderCellDef>Last Name</th>
          <td mat-cell *matCellDef="let employee">{{ employee.last_name }}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let employee">{{ employee.email }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let employee">
            <button mat-button class="blue-btn" (click)="onView(employee)"> View</button>
            <button mat-button class="blue-btn" (click)="onEdit(employee)"> Update</button>
            <button mat-button class="red-btn" (click)="onDelete(employee)"> Delete</button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <ng-template #noData>
        <p class="no-data">No employees found.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .container {
      max-width: 960px;
      margin: 2rem auto;
      padding: 1rem;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .title {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #3f51b5;
    }

    .button-wrapper {
      text-align: right;
      margin-bottom: 1rem;
    }

    .full-width {
      width: 100%;
    }

    .mat-header-cell {
      font-weight: bold;
      background-color: #f5f5f5;
    }

    .mat-cell {
      padding: 0.75rem 1rem;
    }

    .green-btn {
      background-color: #4caf50;
      color: white;
    }

    .green-btn:hover {
      background-color: #43a047;
    }

    .blue-btn {
      background-color: #2196f3;
      color: white;
      margin-right: 8px;
    }

    .blue-btn:hover {
      background-color: #1976d2;
    }

    .red-btn {
      background-color: #f44336;
      color: white;
    }

    .red-btn:hover {
      background-color: #d32f2f;
    }

    .no-data {
      text-align: center;
      color: #888;
      font-size: 1.2rem;
      margin-top: 2rem;
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES
    }).valueChanges.subscribe({
      next: ({ data }) => this.employees = data.employees,
      error: (err) => console.error(err)
    });
  }

  onAddEmployee(): void {
    this.router.navigate(['/add']);
  }

  onEdit(employee: any): void {
    this.router.navigate(['/edit', employee.id]);
  }

  onView(employee: any): void {
    this.router.navigate(['/view', employee.id]);
  }

  onDelete(employee: any): void {
    if (confirm(`Are you sure you want to delete ${employee.first_name} ${employee.last_name}?`)) {
      this.apollo.mutate({
        mutation: DELETE_EMPLOYEE,
        variables: { id: employee.id }
      }).subscribe({
        next: () => this.loadEmployees(),
        error: (err) => console.error(err)
      });
    }
  }
}
