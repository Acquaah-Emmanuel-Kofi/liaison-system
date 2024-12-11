import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../../../shared/store/user.store';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IStudentCompanyMappingResponse } from '../../../../shared/interfaces/response.interface';
import { environment } from '../../../../../environments/environment.development';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);

  private _http = inject(HttpClient);

  constructor() {}

  getStudentsLocation(): Promise<IStudentCompanyMappingResponse> {
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('internship', this.globalStore.type().toString());

    const endpoint = `${
      environment.BACKEND_API_BASE_URL
    }/lecturers/${this.userStore.id()}/students/location`;

    return lastValueFrom(
      this._http.get<IStudentCompanyMappingResponse>(endpoint, { params })
    );
  }
}
