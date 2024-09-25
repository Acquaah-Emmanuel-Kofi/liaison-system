import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { UserStore } from '../../../../shared/store/user.store';
import { IStatAnalyticsResponse } from '../../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly userStore = inject(UserStore);

  private _http = inject(HttpClient);

  constructor() {}

  getStatAnalytics(
    internshipType: string,
    startYear: number,
    endYear: number
  ): Promise<IStatAnalyticsResponse> {
    const params = new HttpParams()
      .set('internshipType', internshipType)
      .set('startYear', startYear.toString())
      .set('endYear', endYear.toString());

    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/dashboard/${this.userStore.id()}`;

    return lastValueFrom(this._http.get<IStatAnalyticsResponse>(endpoint, { params }));
  }
}
