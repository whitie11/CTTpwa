import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  private BASE_URL = environment.urls.BASE_URL;

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/api-token-auth/`;
    return this.http.post<any>(url, {username, password});
  }

  // signUp(email: string, password: string): Observable<User> {
  //   const url = `${this.BASE_URL}/register`;
  //   return this.http.post<User>(url, {email, password});
  // }
}
