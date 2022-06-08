import { LoginResponse } from './../type/auth';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginType } from '../type/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  constructor(private http: HttpClient) { }
  login(dataLogin: LoginType): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.login}`, dataLogin).pipe(catchError(this.handleError));
  };
  register(dataRegister: LoginType): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.register}`, dataRegister).pipe(catchError(this.handleError));
  }
}
