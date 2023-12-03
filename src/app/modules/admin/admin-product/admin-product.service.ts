import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/model/page';
import { AdminProduct } from './model/adminProduct';

@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
  constructor(private http: HttpClient) {}

  public getProducts(
    page: number,
    size: number
  ): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>('/api/v1/admin/products', {
      params: new HttpParams().set('page', page).set('size', size),
    });
  }
}
