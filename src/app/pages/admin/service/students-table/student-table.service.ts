import {inject, Injectable} from '@angular/core';
import {getStudentResponse} from "../../../../shared/interfaces/upload.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentTableService {
  _http = inject(HttpClient)

  constructor() { }

  getAllStudents(){
    const requestOptions = {
    };

    const backend = "https://ss7ffblh-8040.euw.devtunnels.ms";
    return this._http.get<getStudentResponse>(`${backend}/liaison/api/v1/admin/students`, requestOptions);
  }

}
