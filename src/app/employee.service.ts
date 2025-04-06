import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:4000/graphql'; // Update with your actual GraphQL API URL

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    const query = {
      query: `
        {
          employees {
            id
            first_name
            last_name
            email
            gender
            designation
            salary
            date_of_joining
            department
            employee_photo
          }
        }
      `
    };
    return this.http.post(this.apiUrl, query);
  }

  deleteEmployee(id: string): Observable<any> {
    const mutation = {
      query: `
        mutation {
          deleteEmployee(id: "${id}") {
            id
          }
        }
      `
    };
    return this.http.post(this.apiUrl, mutation);
  }
}
