import { Component, inject, signal } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LocationService } from '../../services/location/location.service';
import {
  ILecturerLocation,
  IStudentLocation,
} from '../../interfaces/location.interface';

@Component({
  selector: 'liaison-location',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {
  userLocation = signal<ILecturerLocation>({
    latitude: 7.9465,
    longitude: -1.0232,
  });

  center: google.maps.LatLngLiteral = { lat: -34.397, lng: 150.644 };
  zoom = 10;
  studentLocations: IStudentLocation[] = [
    { lat: 7.9465, lng: -1.0232, label: 'Student 1' },
    { lat: 8.9465, lng: -1.0232, label: 'Student 2' },
    { lat: 6.9465, lng: -2.0232, label: 'Student 3' },
    { lat: 7.1465, lng: -3.0232, label: 'Student 4' },
  ];
  map: google.maps.Map | undefined;

  private locationService = inject(LocationService);

  ngOnInit(): void {
    this.locationService.getUserLocation().subscribe((response) => {
      this.userLocation.set(response);
    });
  }

  onMapReady(mapInstance: google.maps.Map): void {
    this.map = mapInstance;
  }

  calculateRouteToStudent(studentLocation: google.maps.LatLngLiteral): void {
    const lecturerLocation: google.maps.LatLngLiteral = {
      lat: this.userLocation().latitude,
      lng: this.userLocation().longitude,
    };

    if (this.map) {
      this.locationService.calculateRoute(
        lecturerLocation,
        studentLocation,
        this.map
      );
    }
  }
}
