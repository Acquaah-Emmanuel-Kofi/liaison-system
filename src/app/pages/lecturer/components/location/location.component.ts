import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';
@Component({
  selector: 'liaison-location',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {

}
