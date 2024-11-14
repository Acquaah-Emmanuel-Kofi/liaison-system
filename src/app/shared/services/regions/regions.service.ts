import {inject, Injectable} from '@angular/core';
// @ts-ignore
import cities from '../../../../assets/utils/data/cities.json';
import {UserStore} from "../../store/user.store";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../../../environments/environment.development";


@Injectable({
  providedIn: 'root',
})

export class RegionService {
  private readonly userStore = inject(UserStore);
  private readonly http = inject(HttpClient);
  private regions = cities;
  rawRegions = [
    { name: 'Ahafo', value: 'ahafo' },
    { name: 'Ashanti', value: 'Ashanti' },
    { name: "Bono", value: "Bono" },
    { name: "Bono East", value: "Bono East" },
    { name: "Central", value: "Central" },
    { name: "Eastern", value: "Eastern" },
    { name: "Greater Accra", value: "Greater Accra" },
    { name: "Nort East", value: "Nort East" },
    { name: "Northern", value: "Northern" },
    { name: "Oti", value: "Oti" },
    { name: "Savannah", value: "Savannah" },
    { name: "Upper East", value: "Upper East" },
    { name: "Upper West", value: "Upper West" },
    { name: "Volta", value: "Volta" },
    { name: "Western", value: "Western" },
    { name: "Western North", value: "Western North" },

  ]
  private _regions: any | null = null;

  async getRegions(): Promise<any> {
    if (this._regions === null) {
      this._regions = await this.fetchRegions();
    }
    return Object.keys(this._regions.data.regions).sort((a, b) => a.localeCompare(b));
  }

  async getTownsByRegion(region: string): Promise<any> {
    if (this._regions === null) {
      this._regions = await this.fetchRegions();
    }

    return this._regions.data.regions[region].sort((a:string,b:string)=> a.localeCompare(b)) || ["No Data to show here"];
  }

  private async fetchRegions(): Promise<any> {
    const url = `${environment.BACKEND_API_BASE_URL}/regions/${this.userStore.id()}`;
    return await lastValueFrom(this.http.get<any>(url))
  }


  getRawRegions() {
    return this.rawRegions;
  }

  // getRegions() {
  //   const url = ``
  //   return Object.keys(this.regions);
  // }
  //
  // getTownsByRegion(region: string) {
  //   return this.regions[region] || [];
  // }
}

