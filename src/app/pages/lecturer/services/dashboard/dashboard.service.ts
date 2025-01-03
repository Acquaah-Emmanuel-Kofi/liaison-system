import { inject, Injectable } from '@angular/core';
import {
  IFacultyAnalytics,
  ILecturerDashboardResponse,
} from '../../../../shared/interfaces/response.interface';
import { environment } from '../../../../../environments/environment.development';
import { lastValueFrom, tap } from 'rxjs';
import { UserStore } from '../../../../shared/store/user.store';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);

  private _http = inject(HttpClient);

  private httpParams(): HttpParams {
    return new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('semester', this.globalStore.semester().toString())
      .set('internship', this.globalStore.type().toString())
      .set('page', 0)
      .set('size', 10);
  }

  getStatAnalytics(): Promise<ILecturerDashboardResponse> {
    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/lecturers/dashboard/${this.userStore.id()}`;

    return lastValueFrom(
      this._http.get<ILecturerDashboardResponse>(endpoint, {
        params: this.httpParams(),
      })
    );
  }

  getTopIndustries(): Promise<any> {
    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/lecturers/${this.userStore.id()}/get-top-industries`;

    return lastValueFrom(
      this._http.get<any>(endpoint, {
        params: this.httpParams(),
      })
    );
  }

  getChartData(): Promise<IFacultyAnalytics> {
    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/lecturers/${this.userStore.id()}/student/faculty/analytics`;

    return lastValueFrom(
      this._http.get<IFacultyAnalytics>(endpoint, {
        params: this.httpParams(),
      })
    );
  }

  /**
   * Downloads a file from the given URL.
   * @param defaultFileName - The default name to save the file as (optional).
   */
  downloadFile(defaultFileName?: string) {
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('semester', this.globalStore.semester().toString())
      .set('internship', this.globalStore.type().toString());

    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/lecturers/${this.userStore.id()}/supervision/report`;

    return this._http
      .get(endpoint, {
        params,
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        tap((response) => {
          const filename = defaultFileName || 'downloaded-report.xlsx';

          const url = window.URL.createObjectURL(response.body!);

          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = filename;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);

          window.URL.revokeObjectURL(url);
        })
      );
  }
}
