import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    pageNumber: number,
    pageSize: number
  ): Promise<IGetStudentResponse> {
    const url = `${environment.BACKEND_API_BASE_URL}/admin/students?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return lastValueFrom(this._http.get<IGetStudentResponse>(url));
  }

  searchStudent(name: string) {
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

  getAllLeturers(): Observable<IGetLecturersResponse> {
    return this._http.get<IGetLecturersResponse>(
      `${
        environment.BACKEND_API_BASE_URL
      }/admin/${this.userStore.id()}/lecturers`
    );
  }
}
