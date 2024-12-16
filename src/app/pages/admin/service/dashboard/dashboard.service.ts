import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { UserStore } from '../../../../shared/store/user.store';
import {
  IStatAnalyticsResponse,
  IStudentCompanyMappingResponse,
} from '../../../../shared/interfaces/response.interface';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);

  private _http = inject(HttpClient);

  constructor() {}

  private httpParams(): HttpParams {
    return new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('internship', this.globalStore.type().toString())
      .set('page', 0)
      .set('size', 1);
  }

  getStatAnalytics(): Promise<IStatAnalyticsResponse> {
    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/dashboard/${this.userStore.id()}`;

    return lastValueFrom(
      this._http.get<IStatAnalyticsResponse>(endpoint, {
        params: this.httpParams(),
      })
    );
  }

  getStudentsLocation(): Promise<IStudentCompanyMappingResponse> {
    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/${this.userStore.id()}/students/location`;

    return lastValueFrom(
      this._http.get<IStudentCompanyMappingResponse>(endpoint, {
        params: this.httpParams(),
      })
    );
  }

  getAssumptionOfDutyLogs(): Promise<any> {
    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/${this.userStore.id()}/assumption-of-duties/updated`;

    return lastValueFrom(
      this._http.get<any>(endpoint, {
        params: this.httpParams(),
      })
    );
  }
}
