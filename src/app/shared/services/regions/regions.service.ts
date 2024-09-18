import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private regions = [
    'Ahafo Region',
    'Ashanti Region',
    'Bono East Region',
    'Bono Region',
    'Central Region',
    'Eastern Region',
    'Greater Accra Region',
    'North East Region',
    'Northern Region',
    'Oti Region',
    'Savannah Region',
    'Upper East Region',
    'Upper West Region',
    'Volta Region',
    'Western North Region',
    'Western Region',
  ];

  getRegions() {
    return this.regions;
  }
}

