import { Component, inject, isDevMode, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';
import { AuthService } from './pages/auth/services/auth/auth.service';
import { TokenService } from './shared/services/token/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStore } from './shared/store/user.store';
import { PayLoadData } from './shared/interfaces/constants.interface';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularQueryDevtools],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  devEnvironment: boolean = isDevMode();

  _authService = inject(AuthService);
  _tokenService = inject(TokenService);
  _jwtHelper = inject(JwtHelperService);

  userStore = inject(UserStore);

  constructor() {
    this.initializeUser();
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

  ngOnDestroy() {
    this._authService.destroyStorageListener();
  }
}
