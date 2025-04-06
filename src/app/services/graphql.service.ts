import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  // Fetch all employees
  getEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query GetEmployees {
          employees {
            id
            name
            email
            department
            position
          }
        }
      `
    }).valueChanges;
  }

  // Add a new employee
  addEmployee(name: string, email: string, department: string, position: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee($name: String!, $email: String!, $department: String!, $position: String!) {
          addEmployee(name: $name, email: $email, department: $department, position: $position) {
            id
            name
            email
          }
        }
      `,
      variables: { name, email, department, position }
    });
  }
}
