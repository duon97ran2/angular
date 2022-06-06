import { LoginResponse } from './../type/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginType } from '../type/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(dataLogin: LoginType): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.login}`, dataLogin)
  };
  register(dataRegister: LoginType): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.register}`, dataRegister)
  }
}
