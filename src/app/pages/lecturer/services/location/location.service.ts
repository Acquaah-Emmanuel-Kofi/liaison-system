import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IUserLocation } from '../../interfaces/location.interface';
import { environment } from '../../../../../environments/environment.development';

declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private isLoaded = false;
  private mapReadyPromise: Promise<void>;

  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  private _http = inject(HttpClient);

  constructor() {
    this.mapReadyPromise = this.loadMap().then(() => {
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
    });
  }

  private loadMap(): Promise<void> {
    if (this.isLoaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_MAP_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      script.onerror = (error) => reject(error);

      document.head.appendChild(script);
    });
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
    this.mapReadyPromise
      .then(() => {
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
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      })
      .catch((error) => {
        console.error('Google Maps API not loaded', error);
      });
  }
}
