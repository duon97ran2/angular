import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CouponRequest, CouponResponse } from '../type/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error))
  }
  constructor(private http: HttpClient) { }
  getCoupons(): Observable<CouponResponse[]> {
    return this.http.get<CouponResponse[]>(environment.coupon).pipe(catchError(this.handleError));
  }
  reedemCoupon(data: { code: string, userId: string }): Observable<CouponResponse> {
    return this.http.post<CouponResponse>(`${environment.coupon}/redeem`, data).pipe(catchError(this.handleError));
  }
  updateCoupon(data: { redeem_times: number, userId: string } | CouponRequest | { status: number }, id: string): Observable<CouponResponse> {
    return this.http.put<CouponResponse>(`${environment.coupon}/${id}`, data).pipe(catchError(this.handleError));
  }
  createCoupon(data: CouponRequest): Observable<CouponResponse> {
    return this.http.post<CouponResponse>(environment.coupon, data).pipe(catchError(this.handleError));
  }
  removeCoupon(id: string): Observable<CouponResponse> {
    return this.http.delete<CouponResponse>(`${environment.coupon}/${id}`).pipe(catchError(this.handleError));
  }

}
