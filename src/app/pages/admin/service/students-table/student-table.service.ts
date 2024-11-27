import {inject, Injectable, OutputEmitterRef} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import {
  IGetLecturersResponse,
  IGetStudentResponse,
} from '../../../../shared/interfaces/response.interface';
import { environment } from '../../../../../environments/environment.development';
import { UserStore } from '../../../../shared/store/user.store';

@Injectable({
  providedIn: 'root',
})

export class StudentTableService {
  private searchResultsSubject =
    new BehaviorSubject<IGetStudentResponse | null>(null);
  searchResults$ = this.searchResultsSubject.asObservable();

  private readonly userStore = inject(UserStore);

  _http = inject(HttpClient);

  getAllStudents(
    startOfAcademicYear: number,
    endOfAcademicYear: number,
    internship: boolean,
    page: number,
    size: number,

  ): Promise<IGetStudentResponse> {
    const params = new HttpParams().set('startOfAcademicYear',startOfAcademicYear + 1).set('endOfAcademicYear',endOfAcademicYear + 1).set('internship',internship).set('page',page).set('size',size);
    const url = `${environment.BACKEND_API_BASE_URL}/admin/${this.userStore.id()}/students`;
    return lastValueFrom(this._http.get<IGetStudentResponse>(url,{params}));
  }


    searchStudent(name: OutputEmitterRef<string>) {
    return lastValueFrom(
      this._http.get<IGetStudentResponse>(
        `${environment.BACKEND_API_BASE_URL}/admin/students?name=${name}`
      )
    );
  }


  updateSearchResults(results: IGetStudentResponse | undefined) {
    // @ts-ignore
    this.searchResultsSubject.next(results);
  }


  getAllLecturers(
    page: number,
    size: number
  ): Observable<IGetLecturersResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this._http.get<IGetLecturersResponse>(
      `${
        environment.BACKEND_API_BASE_URL
      }/admin/${this.userStore.id()}/lecturers`,
      { params }
    );
  }


}
