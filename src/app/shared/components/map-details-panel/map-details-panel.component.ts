import { Component, input, output } from '@angular/core';
import { IStudentCompanyMapping } from '../../../pages/lecturer/interfaces/location.interface';

@Component({
  selector: 'liaison-map-details-panel',
  standalone: true,
  imports: [],
  templateUrl: './map-details-panel.component.html',
  styleUrl: './map-details-panel.component.scss',
})
export class MapDetailsPanelComponent {
  studentData = input.required<IStudentCompanyMapping | null>();
  closePanel = output<void>();
  triggerRoute = output<void>();
}
