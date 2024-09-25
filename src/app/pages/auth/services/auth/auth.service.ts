import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ICredentials, ILoginResponse } from '../../interfaces/auth.interface';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../../../../shared/services/token/token.service';
import { environment } from '../../../../../environments/environment.development';
import {
  ACCESS_TOKEN_KEY,
  removeFromLocalStorage,
} from '../../../../shared/helpers/constants.helper';
import { UserStore } from '../../../../shared/store/user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userStore = inject(UserStore);

  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _tokenService = inject(TokenService);
  private _jwtHelper = inject(JwtHelperService);

  private _renderer!: Renderer2;
  private _rendererFactory = inject(RendererFactory2);
  private storageListener: ((event: StorageEvent) => void) | null = null;

  constructor() {
    this._renderer = this._rendererFactory.createRenderer(null, null);
    this.setupStorageListener();
  }

  private setupStorageListener() {
    this.storageListener = this._renderer.listen(
      'window',
      'storage',
      (event) => {
        this.handleStorageEvent(event);
      }
    );
  }

  private handleStorageEvent(event: StorageEvent) {
    if (event.key === ACCESS_TOKEN_KEY) {
      event.newValue ? this.handleUserLogin() : this.logout();
    }
  }

  private handleUserLogin() {
    const userRoleRoute = `/${this.userStore.role().toLowerCase()}`;
    if (!this._router.url.includes(userRoleRoute)) {
      this._router.navigate([userRoleRoute]);
    }
  }

  destroyStorageListener() {
    if (this.storageListener) {
      window.removeEventListener('storage', this.storageListener);
      this.storageListener = null;
    }
  }

  public login(credentials: ICredentials): Observable<ILoginResponse> {
    return this._http
      .post<ILoginResponse>(
        `${environment.BACKEND_API_BASE_URL}/auth/login`,
        credentials
      )
      .pipe(
        tap((response: ILoginResponse) => {
          if (response.status === 200) {
            this._tokenService.saveToken(response.data.token);
            const decryptedToken = atob(response.data.token);
            const userDetails = this._jwtHelper.decodeToken(decryptedToken);

            this._router.navigate([userDetails.role.toLowerCase()]);
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
