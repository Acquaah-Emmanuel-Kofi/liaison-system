import { Injectable } from '@angular/core';
// @ts-ignore
import cities  from '../../../../assets/utils/data/cities.json';

@Injectable({
  providedIn: 'root',
})

export class RegionService {
  private regions = cities;

  getRegions() {
    return Object.keys(this.regions);
  }

  getTownsByRegion(region: string) {
    return this.regions[region] || [];
  }


}

