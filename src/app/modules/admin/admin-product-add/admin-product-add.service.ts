import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminProductUpdate } from '../admin-product-update/model/adminProductUpdate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminProductAddService {
  constructor(private http: HttpClient) {}

  saveProduct(product: AdminProductUpdate): Observable<AdminProductUpdate> {
    return this.http.post<AdminProductUpdate>(
      '/api/v1/admin/products',
      product
    );
  }
}
