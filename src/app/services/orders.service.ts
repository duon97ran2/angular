import { throwError, Observable, catchError } from 'rxjs';
import { orderRequest, orderResponse } from './../type/orders';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }
  private handleErrror(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error))
  }
  orderCreate(data: orderRequest): Observable<orderResponse> {
    return this.http.post<orderResponse>(environment.orders, data).pipe(catchError(this.handleErrror));
  }
  getOrders(): Observable<orderResponse[]> {
    return this.http.get<orderResponse[]>(environment.orders).pipe(catchError(this.handleErrror));
  }
  getCancelOrders(): Observable<orderResponse[]> {
    return this.http.get<orderResponse[]>(`${environment.orders}/cancel`).pipe(catchError(this.handleErrror));
  }
  updateOrder(id: string, data: orderRequest | { status: number }): Observable<orderResponse> {
    return this.http.put<orderResponse>(`${environment.orders}/${id}`, data).pipe(catchError(this.handleErrror));
  }
  removeOrder(id: string): Observable<orderResponse> {
    return this.http.delete<orderResponse>(`${environment.orders}/${id}`).pipe(catchError(this.handleErrror));
  }
  getOrderDetail(id: string): Observable<orderResponse> {
    return this.http.get<orderResponse>(`${environment.orders}/${id}`).pipe(catchError(this.handleErrror));
  }
}
