import { inject, Injectable } from '@angular/core';
import { UserStore } from '../../../../shared/store/user.store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { CompanyDetails } from '../../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AssumptionService {
  private readonly userStore = inject(UserStore);
  private readonly globalStore = inject(GlobalVariablesStore);

  private httpParams(): HttpParams {
    return new HttpParams()
      .set('startOfAcademicYear', this.globalStore.startYear())
      .set('endOfAcademicYear', this.globalStore.endYear())
      .set('internship', this.globalStore.type().toString())
      .set('page', 0)
      .set('size', 10);
  }

  _http = inject(HttpClient);

  submitAssumptionForm(formData: any): Observable<any> {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/assumption-of-duty/${this.userStore.id()}`;

    return this._http.post(url, formData, { params: this.httpParams() }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  updateAssuptionOfDuty(
    formData: CompanyDetails,
    dutyId: string
  ): Observable<any> {
    const url = `${
      environment.BACKEND_API_BASE_URL
    }/assumption-of-duty/${this.userStore.id()}/update/${dutyId}`;

    return this._http.put(url, formData, { params: this.httpParams() }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
