import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDetails } from './model/ProductDetails';
import { Observable } from 'rxjs';
import { Review } from './model/review';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}

  getProductDetails(slug: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>('/api/v1/products/' + slug);
  }

  saveProductReview(review: Review) {
    return this.http.post<Review>('/api/v1/reviews', review);
  }
}
