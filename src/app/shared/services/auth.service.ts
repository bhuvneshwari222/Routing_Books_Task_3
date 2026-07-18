import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginUser, IregisterUser } from '../models/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_BASE_URL: string = environment.authBaseUrl;

  constructor(
    private _httpClient: HttpClient
  ) { }

  login(userDetails: ILoginUser): Observable<any> {
    return this._httpClient.post(`${this.AUTH_BASE_URL}/api/auth/login`, userDetails);
  }

  signUp(userDetails: IregisterUser): Observable<any> {
    return this._httpClient.post(`${this.AUTH_BASE_URL}/api/auth/register`, userDetails);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  saveUserRole(userRole: string) {
    localStorage.setItem('userRole', userRole);
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserRole(){
    return localStorage.getItem('userRole')
  }

  logOut() : Observable<any>{
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return of({
      msg: 'Logout Successfully !!!'
    })
  }

}
