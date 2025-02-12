import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';
import { UserStore } from '../../../../shared/store/user.store';
import {
  AssumptionOfDutyDetailsResponse,
  IStatAnalyticsResponse,
  IStudentCompanyMappingResponse,
  StudentAndLecturerChartResponse,
  UpdatedDutiesResponse,
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
      .set('semester', this.globalStore.semester().toString())
      .set('internship', this.globalStore.type().toString())
      .set('page', 0)
      .set('size', 10);
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
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('semester', this.globalStore.semester().toString())
      .set('internship', this.globalStore.type().toString());

    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/${this.userStore.id()}/students/location`;

    return lastValueFrom(
      this._http.get<IStudentCompanyMappingResponse>(endpoint, {
        params,
      })
    );
  }

  getAssumptionOfDutyLogs(): Promise<UpdatedDutiesResponse> {
    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/${this.userStore.id()}/assumption-of-duties/updated`;

    return lastValueFrom(
      this._http.get<UpdatedDutiesResponse>(endpoint, {
        params: this.httpParams(),
      })
    );
  }

  getAssignedAndUnassigned(): Promise<StudentAndLecturerChartResponse> {
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('semester', this.globalStore.semester().toString())
      .set('internship', this.globalStore.type().toString());

    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/admin/dashboard/${this.userStore.id()}/assigned/unassigned/students-and-lecturers`;

    return lastValueFrom(
      this._http.get<StudentAndLecturerChartResponse>(endpoint, {
        params,
      })
    );
  }

  getUpdatedAssumptionOfDutyDetails(dutyId: string): Promise<AssumptionOfDutyDetailsResponse> {
    const endpoint = `${
      environment.BACKEND_API_BASE_URL
      }/admin/${this.userStore.id()}/assumption-of-duties/${dutyId}`;
    
    return lastValueFrom(this._http.get<AssumptionOfDutyDetailsResponse>(endpoint));
  }
}
