import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../../../shared/store/user.store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);
  
  private studentData: any;

  _http = inject(HttpClient);

    private httpParams(): HttpParams {
      return new HttpParams()
        .set('startOfAcademicYear', this.globalStore.startYear())
        .set('endOfAcademicYear', this.globalStore.endYear())
        .set('semester', this.globalStore.semester().toString())
        .set('internship', this.globalStore.type().toString())
    }

  getDashboardInfo() {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/student/dashboard/${this.userStore.id()}`;
    return lastValueFrom(
      this._http.get<any>(url, { params: this.httpParams() })
    );
  }

  setDashboardData(data: any) {
    this.studentData = data;
  }

  getDashboardData() {
    return this.studentData;
  }
}
