import {inject, Injectable} from '@angular/core';
import {getStudentResponse} from "../../../../shared/interfaces/upload.interface";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentTableService {
   backend = "https://liaison-system-backend.onrender.com";
  _http = inject(HttpClient)


  getAllStudents(): Promise<getStudentResponse>{
    const requestOptions = {}
    return lastValueFrom(
      this._http.get<getStudentResponse>(`${this.backend}/liaison/api/v1/admin/students`, requestOptions)
  )
  }

}
