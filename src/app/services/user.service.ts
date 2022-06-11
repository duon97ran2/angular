import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest, UserResponse } from '../type/user';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error));
  }
  constructor(private http: HttpClient) { }
  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(environment.users).pipe(catchError(this.handleError));
  };
  createUser(data: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(environment.users, data).pipe(catchError(this.handleError));
  };
  getUserInfo(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.users}/${id}`).pipe(catchError(this.handleError));
  };
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.users}/${id}`).pipe(catchError(this.handleError));
  };
  updateUserInfo(id: string, data: any): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${environment.users}/${id}`, data).pipe(catchError(this.handleError));
  };
}
