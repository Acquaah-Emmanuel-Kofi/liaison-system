import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  private _http = inject(HttpClient);

  constructor() {}

  public getAllStudents(): Observable<any> {
    return this._http.get<any>(
      `${environment.BACKEND_API_BASE_URL}/admin/students`
    );
  }
}
