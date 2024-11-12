import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ICommonResponse } from '../../../../shared/interfaces/response.interface';
import { environment } from '../../../../../environments/environment.development';
import {UserStore} from "../../../../shared/store/user.store";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  http = inject(HttpClient);
  private readonly  userStore = inject(UserStore)
  students: any[] = [];
  headers: string[] = []


  sendFileToBackend(file: File,internship: boolean): Promise<ICommonResponse> {
    const params = new HttpParams().set('internship',internship)
    const formData = new FormData();
    formData.append('file', file);

    return lastValueFrom(
      this.http.post<ICommonResponse>(
        `${environment.BACKEND_API_BASE_URL}/admin/${this.userStore.id()}/students`,
        formData,{params}
      )
    );
  }


}
