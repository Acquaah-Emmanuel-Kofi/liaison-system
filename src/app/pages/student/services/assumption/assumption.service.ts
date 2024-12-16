import {inject, Injectable} from '@angular/core';
import {UserStore} from "../../../../shared/store/user.store";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";
import {environment} from "../../../../../environments/environment.development";
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';

@Injectable({
  providedIn: 'root',
})
export class AssumptionService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);

  _http = inject(HttpClient);

  submitAssumptionForm(formData: any): Observable<any> {
    const params = new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear().toString())
      .set('endOfAcademicYear', this.globalStore.endYear().toString())
      .set('internship', this.globalStore.type());

    const url = `${
      environment.BACKEND_API_BASE_URL
    }/assumption-of-duty/${this.userStore.id()}`;

    return this._http.post(url, formData, { params }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }


  updateAssuptionOfDuty(formData: any, dutyId: string): Observable<any> {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/assumption-of-duty/${this.userStore.id()}/update/${dutyId}`;

    return this._http.patch(url, formData).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
