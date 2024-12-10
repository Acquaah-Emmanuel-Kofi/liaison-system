import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IUserLocation } from '../../../pages/lecturer/interfaces/location.interface';

declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;

  private _http = inject(HttpClient);

  constructor() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }

  getUserLocation(): Observable<IUserLocation> {
    return this._http
      .get<IUserLocation>('https://ipapi.co/json/')
      .pipe(catchError(() => this.getLocationFromBrowser()));
  }

  private getLocationFromBrowser(): Observable<IUserLocation> {
    if (!navigator.geolocation) {
      return of({
        latitude: 0,
        longitude: 0,
        message: 'Geolocation is not supported by your browser.',
      });
    }

    return new Observable<IUserLocation>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          observer.complete();
        },
        (error) => {
          observer.error(
            error.message || 'Failed to retrieve location from browser.'
          );
        }
      );
    });
  }

  calculateRoute(
    origin: google.maps.LatLngLiteral,
    destination: google.maps.LatLngLiteral,
    map: google.maps.Map
  ): void {
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(
      request,
      (
        result: google.maps.DirectionsResult | null,
        status: google.maps.DirectionsStatus
      ) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          this.directionsRenderer.setDirections(result);
          this.directionsRenderer.setMap(map);
        } else {
          const errorMessage = `Error fetching directions: ${status}`;
          console.error(errorMessage);
          throw new Error(errorMessage);
        }
      }
    );
  }
}
