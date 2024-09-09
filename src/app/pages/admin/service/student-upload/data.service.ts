import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { uploadResponse } from '../../../../shared/interfaces/upload.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  http = inject(HttpClient);
  students: any[] = [];
  headers: string[] = []; // Store dynamic headers
  backend = 'https://liaison-system-backend.onrender.com';

  // Use this function to send a file to the backend and return a Promise
  sendFileToBackend(file: File): Promise<uploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return lastValueFrom(
      this.http.post<uploadResponse>(`${this.backend}/liaison/api/v1/admin/students`, formData)
    );
  }
}
