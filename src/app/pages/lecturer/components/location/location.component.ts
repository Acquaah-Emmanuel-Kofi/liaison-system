import { Component, inject, signal, viewChild } from '@angular/core';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { IStudentCompanyMapping } from '../../../../shared/interfaces/location.interface';
import { LocationService } from '../../services/location/location.service';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { studentsLocationQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { MapDetailsPanelComponent } from '../../../../shared/components/map-details-panel/map-details-panel.component';
@Component({
  selector: 'liaison-location',
  standalone: true,
  imports: [MapComponent, MapDetailsPanelComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  studentLocationData = signal<IStudentCompanyMapping | null>(null);
  mapComponent = viewChild(MapComponent);

  studentData = signal<IStudentCompanyMapping[]>([]);

  private _locationService = inject(LocationService);
  private globalStore = inject(GlobalVariablesStore);

  getStudentLocationToTogglePanel(location: any) {
    this.studentLocationData.set(location);
  }

  closePanel() {
    this.studentLocationData.set(null);
  }

  triggerRoute() {
    const studentLocation = this.studentLocationData();
    if (studentLocation && this.mapComponent) {
      const { lat, lng } = studentLocation;
      this.mapComponent()?.calculateRouteToStudent({ lat, lng });

      this.closePanel();
    } else {
      alert('Something went wrong.');
    }
  }

  studentsLocationQuery = injectQuery(() => ({
    queryKey: [
      ...studentsLocationQueryKey.data(
        this.globalStore.type(),
        this.globalStore.startYear(),
        this.globalStore.endYear()
      ),
    ],
    queryFn: async () => {
      const response = await this._locationService.getStudentsLocation();

      this.studentData.set(response.data);

      return response.data;
    },
  }));
}
