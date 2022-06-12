import { createType } from './../type/product';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { Product } from '../type/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
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
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.products).pipe(catchError(this.handleError));
  };
  searchProduct(text: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.search}?q=${text}`).pipe(catchError(this.handleError))
  }
  getHomeProduct(): Observable<any> {
    return this.http.get<any>(`${environment.products}/home`).pipe(catchError(this.handleError));
  };
  getProductDetail(id: string | null): Observable<Product> {
    return this.http.get<Product>(`${environment.products}/${id}`).pipe(catchError(this.handleError));
  };
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${environment.products}/${id}`).pipe(catchError(this.handleError));
  };
  createProduct(product: createType): Observable<Product> {
    return this.http.post<Product>(`${environment.products}`, product).pipe(catchError(this.handleError));
  };
  getByCategory(id: string): Observable<any> {
    return this.http.get<any>(`${environment.products}/category/${id}`).pipe(catchError(this.handleError));
  };
  updateProduct(id: string | null, product: any): Observable<Product> {
    return this.http.put<Product>(`${environment.products}/${id}`, product).pipe(catchError(this.handleError));
  }

}
