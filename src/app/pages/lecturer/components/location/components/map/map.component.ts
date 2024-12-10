import { Component, inject, output, signal } from '@angular/core';
import {
  IUserLocation,
  IStudentLocation,
} from '../../../../interfaces/location.interface';
import { LocationService } from '../../../../services/location/location.service';
import { GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'liaison-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  clickedMarker = output<IStudentLocation>();

  lecturerLocation = signal<IUserLocation>({
    latitude: 7.9465,
    longitude: -1.0232,
  });

  center: google.maps.LatLngLiteral = { lat: 7.9465, lng: -1.0232 };
  map: google.maps.Map | undefined;

  studentLocations: IStudentLocation[] = [
    { lat: 7.9465, lng: -1.0232, label: 'Student 1' },
    { lat: 8.9465, lng: -1.0232, label: 'Student 2' },
    { lat: 6.9465, lng: -2.0232, label: 'Student 3' },
    { lat: 7.1465, lng: -3.0232, label: 'Student 4' },
  ];

  private locationService = inject(LocationService);

  ngOnInit(): void {
    this.locationService.getUserLocation().subscribe((location) => {
      this.lecturerLocation.set(location);
    });
  }

  onMapReady(mapInstance: google.maps.Map): void {
    this.map = mapInstance;
  }

  calculateRouteToStudent(studentLocation: google.maps.LatLngLiteral): void {
    const lecturerLocation: google.maps.LatLngLiteral = {
      lat: this.lecturerLocation().latitude,
      lng: this.lecturerLocation().longitude,
    };

    if (this.map) {
      this.locationService.calculateRoute(
        lecturerLocation,
        studentLocation,
        this.map
      );
    } else {
      alert("An error occurred! Couldn't initialize map.");
    }
  }

  onMarkerClick(location: IStudentLocation) {
    this.clickedMarker.emit(location);
  }
}
