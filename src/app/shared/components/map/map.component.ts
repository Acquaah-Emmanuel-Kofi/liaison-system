import { Component, inject, output, signal } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { IUserLocation } from '../../../pages/lecturer/interfaces/location.interface';
import { LocationService } from '../../../pages/lecturer/services/location/location.service';
@Component({
  selector: 'liaison-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  clickedMarker = output();

  userLocation = signal<IUserLocation>({
    latitude: 7.9465,
    longitude: -1.0232,
  });

  center: google.maps.LatLngLiteral = { lat: 7.9465, lng: -1.0232 };
  map: google.maps.Map | undefined;

  studentLocations= [
    { lat: 7.9465, lng: -1.0232, label: 'Student 1' },
    { lat: 8.9465, lng: -1.0232, label: 'Student 2' },
    { lat: 6.9465, lng: -2.0232, label: 'Student 3' },
    { lat: 7.1465, lng: -3.0232, label: 'Student 4' },
  ];

  private locationService = inject(LocationService);

  ngOnInit(): void {
    this.locationService.getUserLocation().subscribe((location) => {
      this.userLocation.set(location);
    });
  }

  onMapReady(mapInstance: google.maps.Map): void {
    this.map = mapInstance;
  }

  calculateRouteToStudent(studentLocation: google.maps.LatLngLiteral): void {
    const userLocation: google.maps.LatLngLiteral = {
      lat: this.userLocation().latitude,
      lng: this.userLocation().longitude,
    };

    if (this.map) {
      this.locationService.calculateRoute(
        userLocation,
        studentLocation,
        this.map
      );
    } else {
      alert("An error occurred! Couldn't initialize map.");
    }
  }

  onMarkerClick(location: any) {
    this.clickedMarker.emit(location);
  }
}
