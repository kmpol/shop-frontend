import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminProductUpdate } from './model/adminProductUpdate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminProductUpdateService {
  constructor(private http: HttpClient) {}

  getProduct(id: number): Observable<AdminProductUpdate> {
    return this.http.get<AdminProductUpdate>(`/api/v1/admin/products/${id}`);
  }

  saveProduct(id: number, product: AdminProductUpdate) {
    return this.http.put<AdminProductUpdate>(
      `/api/v1/admin/products/${id}`,
      product
    );
  }
}
