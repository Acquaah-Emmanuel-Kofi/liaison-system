import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment.development';
import { catchError, lastValueFrom, Observable, tap } from 'rxjs';
import { UserStore } from '../../../../../shared/store/user.store';
import { lectureListModule } from '../zone.interface';
import { GlobalVariablesStore } from '../../../../../shared/store/global-variables.store';

export type TownData = {
  region: string;
  towns: string[];
};

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);

  private httpParams(): HttpParams {
    return new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('semester', this.globalStore.semester().toString())
      .set('internship', this.globalStore.type().toString())
      .set('page', 0)
      .set('size', 10);
  }

  private _http = inject(HttpClient);

  getAllLectures(): Promise<lectureListModule> {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/lecturers/${this.userStore.id()}`;
    return lastValueFrom(
      this._http.get<lectureListModule>(url, { params: this.httpParams() })
    );
  }

  submitZone(formData: any): Observable<any> {
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('internship', this.globalStore.type().toString());

    const url = `${
      environment.BACKEND_API_BASE_URL
    }/zones/${this.userStore.id()}`;

    return this._http.post(url, formData, { params }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  submitTown(townData: TownData): Observable<any> {
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('internship', this.globalStore.type().toString());

    const url = `${
      environment.BACKEND_API_BASE_URL
    }/regions/${this.userStore.id()}`;

    return this._http.post(url, townData, { params }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  getAllCreatedZones() {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/zones/${this.userStore.id()}`;
    return lastValueFrom(
      this._http.get<any>(url, { params: this.httpParams() })
    );
  }
}
