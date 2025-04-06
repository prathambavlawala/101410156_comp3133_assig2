import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { LOGIN_QUERY } from '../graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  login(email: string, password: string) {
    return this.apollo.query<any>({
      query: LOGIN_QUERY,
      variables: { email, password },
      fetchPolicy: 'no-cache'
    }).pipe(
      map(result => result.data.login)
    );
  }

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken() {
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
