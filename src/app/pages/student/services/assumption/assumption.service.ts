import {inject, Injectable} from '@angular/core';
import {UserStore} from "../../../../shared/store/user.store";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";
import {environment} from "../../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AssumptionService {
  private readonly  userStore = inject(UserStore)

  _http = inject(HttpClient);
  constructor() { }

  submitAssumptionForm(formData:any, startYear:number, endYear:number, internship:boolean): Observable<any>{
    const params = new HttpParams()
      .set('startOfAcademicYear', startYear.toString())
      .set('endOfAcademicYear', endYear.toString())
      .set('internship', internship);

    const url = `${environment.BACKEND_API_BASE_URL}/assumption-of-duty/${this.userStore.id()}`;

    return this._http.post(url, formData, { params }).pipe(
      tap((response:any) => console.log('Response:', response)),
      catchError(error => {
        throw error;
      })
    );
  }


}
