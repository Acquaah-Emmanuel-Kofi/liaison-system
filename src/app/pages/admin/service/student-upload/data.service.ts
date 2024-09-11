import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ICommonResponse } from '../../../../shared/interfaces/response.interface';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  students: any[] = [];
  headers: string[] = [];

  // Use this function to send a file to the backend and return a Promise
  sendFileToBackend(file: File): Promise<ICommonResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return lastValueFrom(
      this.http.post<ICommonResponse>(
        `${environment.BACKEND_API_BASE_URL}/admin/students`,
        formData
      )
    );
  }
}
