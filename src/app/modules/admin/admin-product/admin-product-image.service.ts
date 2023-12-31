import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadResponse } from './model/uploadResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminProductImageService {
  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>(
      '/api/v1/admin/products/upload-image',
      formData
    );
  }
}
