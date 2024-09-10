import { Injectable } from '@angular/core';
import {
  ACCESS_TOKEN_KEY,
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../../helpers/constants.helper';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    saveToLocalStorage(ACCESS_TOKEN_KEY, token);
  }

  getToken(): string | null {
    const token = getFromLocalStorage(ACCESS_TOKEN_KEY);

    if (token) {
      const decodedToken = atob(token);

      return decodedToken;
    }

    return null;
  }

  removeToken() {
    removeFromLocalStorage(ACCESS_TOKEN_KEY);
  }
}
