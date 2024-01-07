import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminReview } from './model/adminReview';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminReviewService {
  constructor(private http: HttpClient) {}

  getReviews(): Observable<Array<AdminReview>> {
    return this.http.get<Array<AdminReview>>('/api/v1/admin/reviews');
  }

  removeReview(id: number): Observable<void> {
    return this.http.delete<void>('/api/v1/admin/reviews/' + id);
  }

  moderateReview(id: number): Observable<void> {
    return this.http.patch<void>(`/api/v1/admin/reviews/${id}/moderate`, '');
  }
}
