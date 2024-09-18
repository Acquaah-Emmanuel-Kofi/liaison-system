import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.development";
import {lastValueFrom} from "rxjs";
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

  // getCountries(){
  //   return lastValueFrom(
  //     `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/US/regions `
  //   )
  // }

}
