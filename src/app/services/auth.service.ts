import { LoginResponse } from './../type/auth';
import { BehaviorSubject, catchError, Observable, retry, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginType } from '../type/auth';
import { environment } from 'src/environments/environment';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<LoginResponse | null>;
  currentUser: Observable<LoginResponse | null>
  private handleError(error: HttpErrorResponse) {
    // if (error.status === 0) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error);
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong.
    //   console.error(
    //     `Backend returned code ${error.status}, body was: `, error.error);
    // }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.error));
  }
  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(localStorage.getItem('loggedInUser')!));
    this.currentUser = this.userSubject.asObservable();
  }
  login(dataLogin: LoginType): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.login}`, dataLogin).pipe(catchError(this.handleError), tap(response => {
      localStorage.setItem('loggedInUser', JSON.stringify(response),);
      this.userSubject.next(response);
    }));
  };
  register(dataRegister: LoginType): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.register}`, dataRegister).pipe(catchError(this.handleError));
  };
  updateUsername(username: string, id: string | undefined): Observable<LoginResponse> {
    return this.http.put<LoginResponse>(`${environment.users}/${id}`, { username }).pipe(catchError(this.handleError), tap(response => {
      localStorage.setItem("loggedInUser", JSON.stringify(response));
      this.userSubject.next(response);
    }));
  };
  updateAvatar(avatar: string[], id: string | undefined): Observable<LoginResponse> {
    return this.http.put<LoginResponse>(`${environment.users}/${id}`, { avatar }).pipe(catchError(this.handleError), tap(response => {
      localStorage.setItem("loggedInUser", JSON.stringify(response));
      this.userSubject.next(response);
    }));
  };
  checkPassword(password: string, id: string): Observable<any> {
    return this.http.post<any>(`${environment.users}/${id}`, { password }).pipe(catchError(this.handleError))
  };
  updatePassword(data: { newPassword: string, confirmPassword: string }, id: string): Observable<any> {
    return this.http.put<any>(`${environment.users}/${id}/password`, data).pipe(catchError(this.handleError))
  };
  logOut() {
    localStorage.removeItem("loggedInUser");
    this.userSubject.next(null);
    this.currentUser = this.userSubject.asObservable();
  }
}
