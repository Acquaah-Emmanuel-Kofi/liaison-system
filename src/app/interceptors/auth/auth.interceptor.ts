import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../shared/services/token/token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../pages/auth/services/auth/auth.service';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const jwtHelper = inject(JwtHelperService);
  const authService = inject(AuthService);
  const accessToken: string | null = tokenService.getToken();

  if (accessToken) {
    if (jwtHelper.isTokenExpired(accessToken)) {
      authService.logout();

      return throwError(() => new Error('Token is expired, logging out'));
    }

    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    return next(cloned);
  }

  return next(req);
};
