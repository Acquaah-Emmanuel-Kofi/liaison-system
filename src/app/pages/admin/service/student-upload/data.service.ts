import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ICommonResponse } from '../../../../shared/interfaces/response.interface';
import { environment } from '../../../../../environments/environment.development';
import { UserStore } from '../../../../shared/store/user.store';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';

export type FIleType = 'student' | 'duty';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);
  private baseUrl = environment.BACKEND_API_BASE_URL;

  private http = inject(HttpClient);

  private httpParams(): HttpParams {
    return new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('semester', this.globalStore.semester().toString())
      .set('internship', this.globalStore.type().toString());
  }

  sendFileToBackend(file: File, type: FIleType): Promise<ICommonResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const sudentEndpoint = `${
      this.baseUrl
    }/admin/${this.userStore.id()}/students`;

    const dutyEndpoint = `${
      this.baseUrl
    }/assumption-of-duty/${this.userStore.id()}/upload/duties`;

    return lastValueFrom(
      this.http.post<ICommonResponse>(
        type === 'student' ? sudentEndpoint : dutyEndpoint,
        formData,
        {
          params: this.httpParams(),
        }
      )
    );
  }
}
