import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategoryNameDto } from '../common/dto/adminCategoryNameDto';
import { AdminCategory } from './model/adminCategory';

@Injectable({
  providedIn: 'root',
})
export class AdminCategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Array<AdminCategoryNameDto>> {
    return this.http.get<Array<AdminCategoryNameDto>>(
      '/api/v1/admin/categories'
    );
  }

  createCategory(value: AdminCategory): Observable<AdminCategory> {
    return this.http.post<AdminCategory>('/api/v1/admin/categories', value);
  }

  getCategory(id: number) {
    return this.http.get<AdminCategory>('/api/v1/admin/categories/' + id);
  }

  updateCategory(id: number, value: any): Observable<AdminCategory> {
    return this.http.put<AdminCategory>(
      '/api/v1/admin/categories/' + id,
      value
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>('/api/v1/admin/categories/' + id);
  }
}
