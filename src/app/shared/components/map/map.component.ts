import { Component, inject, model, output, signal } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { IUserLocation } from '../../../pages/lecturer/interfaces/location.interface';
import { LocationService } from '../../services/location/location.service';

@Component({
  selector: 'liaison-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  clickedMarker = output();
  mapData = model.required<any[]>();

  userLocation = signal<IUserLocation>({
    latitude: 0,
    longitude: 0,
  });

  center: google.maps.LatLngLiteral = { lat: 7.9465, lng: -1.0232 };
  map: google.maps.Map | undefined;
  zoom: number = 7;

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

  onMarkerClick(data: any) {
    this.clickedMarker.emit(data);
  }
}
