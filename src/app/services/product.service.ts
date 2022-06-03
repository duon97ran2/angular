import { createType } from './../type/product';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../type/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.products);
  };
  getProductDetail(id: string | null): Observable<Product> {
    return this.http.get<Product>(`${environment.products}/${id}`)
  };
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${environment.products}/${id}`)
  };
  createProduct(product: createType): Observable<Product> {
    return this.http.post<Product>(`${environment.products}`, product)
  };
  updateProduct(id: string | null, product: createType): Observable<Product> {
    return this.http.put<Product>(`${environment.products}/${id}`, product)
  }

}
