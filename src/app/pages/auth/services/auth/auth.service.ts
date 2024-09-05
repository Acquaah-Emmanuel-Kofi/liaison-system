import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ICredentials, ILoginResponse } from '../../interfaces/auth.interface';
import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import {
  ACCESS_TOKEN_KEY,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../../../shared/helpers/constants.helper';
import { TokenService } from '../../../shared/services/token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _tokenService = inject(TokenService);
  private _jwtHelper = inject(JwtHelperService);

  constructor() {}

  public loginUser(credentials: ICredentials): Observable<ILoginResponse> {
    return this._http
      .post<ILoginResponse>(
        `${environment.BACKEND_API_BASE_URL}/login`,
        credentials
      )
      .pipe(
        tap((response: ILoginResponse) => {
          if (response.status === 200) {
            saveToLocalStorage(ACCESS_TOKEN_KEY, response.data.token);
          }
        })
      );
  }

  public logout() {
    removeFromLocalStorage(ACCESS_TOKEN_KEY);
    this._router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    const token = this._tokenService.getToken();
    return !this._jwtHelper.isTokenExpired(token);
  }
}
