import { Component, signal, viewChild } from '@angular/core';
import { MapComponent } from '../../../../shared/components/map/map.component';

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
