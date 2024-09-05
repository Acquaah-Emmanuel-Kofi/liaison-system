import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { JwtModule } from '@auth0/angular-jwt';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ACCESS_TOKEN_KEY,
  getFromLocalStorage,
} from './shared/helpers/constants.helper';

const token = () => getFromLocalStorage(ACCESS_TOKEN_KEY);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: token,
          allowedDomains: ['liaison-system.vercel.app'],
          disallowedRoutes: ['system.com'],
        },
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
