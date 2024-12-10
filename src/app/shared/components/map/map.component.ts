import { Component, inject, output, signal } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { IUserLocation } from '../../../pages/lecturer/interfaces/location.interface';
import { LocationService } from '../../../pages/lecturer/services/location/location.service';
import { DashboardService } from '../../../pages/admin/service/dashboard/dashboard.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { studentsLocationQueryKey } from '../../helpers/query-keys.helper';
import { GlobalVariablesStore } from '../../store/global-variables.store';
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
    latitude: 0,
    longitude: 0,
  });

  center: google.maps.LatLngLiteral = { lat: 7.9465, lng: -1.0232 };
  map: google.maps.Map | undefined;
  zoom: number = 7;

  private globalStore = inject(GlobalVariablesStore);

  studentLocations = [
    { lat: 7.9465, lng: -1.0232, label: 'Student 1' },
    { lat: 8.9465, lng: -1.0232, label: 'Student 2' },
    { lat: 6.9465, lng: -2.0232, label: 'Student 3' },
    { lat: 7.1465, lng: -3.0232, label: 'Student 4' },
  ];

  private locationService = inject(LocationService);
  _dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.locationService.getUserLocation().subscribe((location) => {
      this.userLocation.set(location);
    });

    this._dashboardService.getStudentsLocation();
  }

  analyticsQuery = injectQuery(() => ({
    queryKey: [
      ...studentsLocationQueryKey.data(
        this.globalStore.type(),
        this.globalStore.startYear(),
        this.globalStore.endYear()
      ),
    ],
    queryFn: async () => {
      const response = await this._dashboardService.getStudentsLocation();

      console.log('Data: ', response);

      return response.data;
    },
  }));

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
