import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryProducts } from './model/categoryProducts';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCatregoryWithProducts(
    slug: string,
    page: number,
    size: number
  ): Observable<CategoryProducts> {
    return this.http.get<CategoryProducts>(
      `/api/v1/categories/${slug}/products`,
      {
        params: new HttpParams().set('page', page).set('size', size),
      }
    );
  }
}
