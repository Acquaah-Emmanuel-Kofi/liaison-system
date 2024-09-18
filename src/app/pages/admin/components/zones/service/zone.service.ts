import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IGetStudentResponse} from "../../../../../shared/interfaces/response.interface";
import {environment} from "../../../../../../environments/environment.development";
import {lastValueFrom} from "rxjs";
import {UserStore} from "../../../../../shared/store/user.store";

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private readonly  userStore = inject(UserStore)

  _http = inject(HttpClient);

  getAllLectures(): Promise<IGetStudentResponse> {
    const url = `${environment.BACKEND_API_BASE_URL}/lecturers/${this.userStore.id()}`;
    return lastValueFrom(this._http.get<IGetStudentResponse>(url));
  }

}
