import { inject, Injectable, OutputEmitterRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import {
  IGetLecturersResponse,
  IGetStudentForLecturer,
  IGetStudentResponse,
} from '../../../../shared/interfaces/response.interface';
import { environment } from '../../../../../environments/environment.development';
import { UserStore } from '../../../../shared/store/user.store';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';

@Injectable({
  providedIn: 'root',
})
export class StudentTableService {
  private readonly globalStore = inject(GlobalVariablesStore);
  private readonly userStore = inject(UserStore);

  _http = inject(HttpClient);

  private httpParams(): HttpParams {
    return new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('internship', this.globalStore.type().toString())
      .set('page', 0)
      .set('size', 10);
  }

  getAllStudents(): Promise<IGetStudentResponse> {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/admin/${this.userStore.id()}/students`;
    return lastValueFrom(
      this._http.get<IGetStudentResponse>(url, { params: this.httpParams() })
    );
  }

  getStudentsInlectureZone() {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/lecturers/dashboard/${this.userStore.id()}`;
    return lastValueFrom(
      this._http.get<IGetStudentForLecturer>(url, { params: this.httpParams() })
    );
  }

  changeStudentSupervision(studentID: string): Observable<any> {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/lecturers/${this.userStore.id()}/supervise/${studentID}`;
    return this._http.put<any>(url, {});
  }

  getAllLecturers(): Observable<IGetLecturersResponse> {
    return this._http.get<IGetLecturersResponse>(
      `${
        environment.BACKEND_API_BASE_URL
      }/admin/${this.userStore.id()}/lecturers`,
      { params: this.httpParams() }
    );
  }
}
