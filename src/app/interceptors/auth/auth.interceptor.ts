import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../shared/services/token/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const accessToken: string | null = tokenService.getToken();

  if (accessToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    return next(cloned);
  }

  return next(req);
};
