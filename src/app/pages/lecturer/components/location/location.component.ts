import { Component, signal } from '@angular/core';
import { MapComponent } from './components/map/map.component';
import { IStudentLocation } from '../../interfaces/location.interface';
@Component({
  selector: 'liaison-location',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  studentLocation = signal<IStudentLocation | null>(null);

  getStudentLocationToTogglePanel(location: IStudentLocation) {
    this.studentLocation.set(location);
  }

  closePanel() {
    this.studentLocation.set(null)
  }
}
