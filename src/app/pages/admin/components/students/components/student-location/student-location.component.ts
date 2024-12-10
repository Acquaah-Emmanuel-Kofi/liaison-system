import { Component, inject, signal, viewChild } from '@angular/core';
import { MapComponent } from '../../../../../../shared/components/map/map.component';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { studentsLocationQueryKey } from '../../../../../../shared/helpers/query-keys.helper';
import { DashboardService } from '../../../../service/dashboard/dashboard.service';
import { GlobalVariablesStore } from '../../../../../../shared/store/global-variables.store';
import { IStudentCompanyMapping } from '../../../../../lecturer/interfaces/location.interface';

@Component({
  selector: 'liaison-student-location',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './student-location.component.html',
  styleUrl: './student-location.component.scss',
})
export class StudentLocationComponent {
  studentLocation = signal<any | null>(null);
  mapComponent = viewChild(MapComponent);

  studentData = signal<IStudentCompanyMapping[]>([]);

  private dashboardService = inject(DashboardService);
  private globalStore = inject(GlobalVariablesStore);

  getStudentLocationToTogglePanel(location: any) {
    this.studentLocation.set(location);
  }

  closePanel() {
    this.studentLocation.set(null);
  }

  triggerRoute() {
    const studentLocation = this.studentLocation();
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
      const response = await this.dashboardService.getStudentsLocation();

      this.studentData.set(response.data);

      return response.data;
    },
  }));
}
