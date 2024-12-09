import {inject, Injectable} from '@angular/core';
import {UserStore} from "../../../../shared/store/user.store";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, lastValueFrom, Observable, tap} from "rxjs";
import {environment} from "../../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly  userStore = inject(UserStore)
  private studentData: any;

  _http = inject(HttpClient);

  getDashboardInfo(){
    const url = `${environment.BACKEND_API_BASE_URL}/student/dashboard/${this.userStore.id()}`;
    return lastValueFrom( this._http.get<any>(url));
  }

  setDashboardData(data: any) {
    this.studentData = data;
  }

  getDashboardData() {
    return this.studentData;
  }
}
