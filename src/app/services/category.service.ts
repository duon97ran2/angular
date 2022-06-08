import { CategoryResponse, CategoryRequest } from './../type/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getCategory(): Observable<CategoryResponse[]> {
    return this.http.get<CategoryResponse[]>(`${environment.category}`)
  };
  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.category}/${id}`)
  };
  readCategory(id: string): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${environment.category}/${id}`)
  };
  createCategory(data: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${environment.category}`, data)
  };
  updateCategory(id: string, data: CategoryRequest): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${environment.category}/${id}`, data)
  }
}
