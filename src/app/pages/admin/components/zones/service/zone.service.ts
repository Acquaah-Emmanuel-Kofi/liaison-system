import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.development";
import {catchError, lastValueFrom, Observable, tap} from "rxjs";
import {UserStore} from "../../../../../shared/store/user.store";
import {lectureListModule, lectureListResponse} from "../zone.interface";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private readonly  userStore = inject(UserStore)

  _http = inject(HttpClient);

  getAllLectures(): Promise<lectureListModule> {
    const url = `${environment.BACKEND_API_BASE_URL}/lecturers/${this.userStore.id()}`;
    return lastValueFrom(this._http.get<lectureListModule>(url));
  }

  submitZone(formData:any,startOfAcademicYear: number  ,endOfAcademicYear:number,internship:boolean): Observable<any>{
    const params = new HttpParams()
      .set('startOfAcademicYear', startOfAcademicYear.toString())
      .set('endOfAcademicYear', endOfAcademicYear.toString())
      .set('internship', internship);

    const url = `${environment.BACKEND_API_BASE_URL}/zones/${this.userStore.id()}`;

    return this._http.post(url, formData, { params }).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        throw error;
      })
    );
  }

  getAllCreatedZones(startOfAcademicYear: number,endOfAcademicYear: number,internship: boolean){
    const params = new HttpParams()
      .set('startOfAcademicYear', startOfAcademicYear.toString())
      .set('endOfAcademicYear', endOfAcademicYear.toString())
      .set('internship', internship);

    const url = `${environment.BACKEND_API_BASE_URL}/zones/${this.userStore.id()}`;
    return lastValueFrom(this._http.get<any>(url, { params }));

  }




}
