import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { UserStore } from '../../../../shared/store/user.store';
import { IStatAnalyticsResponse, IStudentCompanyMappingResponse } from '../../../../shared/interfaces/response.interface';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);

  private _http = inject(HttpClient);

  constructor() {}

  getStatAnalytics(): Promise<IStatAnalyticsResponse> {
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('internship', this.globalStore.type().toString());

    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/dashboard/${this.userStore.id()}`;

    return lastValueFrom(
      this._http.get<IStatAnalyticsResponse>(endpoint, { params })
    );
  }

  getStudentsLocation(): Promise<IStudentCompanyMappingResponse> {
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('internship', this.globalStore.type().toString());

    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/${this.userStore.id()}/students/location`;

    return lastValueFrom(
      this._http.get<IStudentCompanyMappingResponse>(endpoint, { params })
    );
  }
}
