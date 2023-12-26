import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCategoryNameDto } from './adminCategoryNameDto';

@Injectable({
  providedIn: 'root',
})
export class FormCategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<Array<AdminCategoryNameDto>> {
    return this.http.get<Array<AdminCategoryNameDto>>(
      '/api/v1/admin/categories'
    );
  }
}
