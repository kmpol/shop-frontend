import { Injectable } from '@angular/core';
import { Product } from './model/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/model/page';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProducts(page: number, size: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>('/api/v1/products', {
      params: new HttpParams().set('page', page).set('size', size),
    });
  }
}
