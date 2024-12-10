import { Component, inject, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { AuthService } from './pages/auth/services/auth/auth.service';
import { TokenService } from './shared/services/token/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStore } from './shared/store/user.store';
import { PayLoadData } from './shared/interfaces/constants.interface';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  devEnvironment: boolean = isDevMode();

  _authService = inject(AuthService);
  _tokenService = inject(TokenService);
  _jwtHelper = inject(JwtHelperService);

  userStore = inject(UserStore);

  private isLoaded = false;

  constructor() {
    this.initializeUser();
    this.loadMap();
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

  private initializeUser() {
    const token = this._tokenService.getToken();
    if (token && !this._jwtHelper.isTokenExpired(token)) {
      const decodedToken: PayLoadData = jwtDecode(token);
      this.setUserDetails(decodedToken);
    }
  }

  setUserDetails(user: PayLoadData) {
    this.userStore.setUserDetails({
      firstName: user.firstname,
      lastName: user.lastname,
      phone: user.phone,
      role: user.role,
      email: user.sub,
      id: user.jti,
    });
  }
}
