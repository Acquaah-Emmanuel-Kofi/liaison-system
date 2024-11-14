import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ILecturerLocation } from '../../interfaces/location.interface';
import { environment } from '../../../../../environments/environment.development';

declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class LocationService implements OnInit {
  private isLoaded = false;

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

  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  ngOnInit(): void {
    this.loadMap()
      .then(() => {
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
      })
      .catch((error) => {
        console.error('Google Maps API failed to load', error);
      });
  }

  private _http = inject(HttpClient);

  getUserLocation(): Observable<ILecturerLocation> {
    return this._http.get<ILecturerLocation>('https://ipapi.co/json/');
  }

 
}
