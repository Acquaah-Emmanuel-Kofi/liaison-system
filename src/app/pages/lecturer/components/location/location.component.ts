import { Component, signal, viewChild } from '@angular/core';
import { MapComponent } from '../../../../shared/components/map/map.component';
import { IStudentCompanyMapping } from '../../../../shared/interfaces/location.interface';
@Component({
  selector: 'liaison-location',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  studentLocation = signal<any | null>(null);
  mapComponent = viewChild(MapComponent);

  studentData = signal<IStudentCompanyMapping[]>([]);

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
}
