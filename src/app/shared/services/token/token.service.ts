import { inject, Injectable } from '@angular/core';
import {
  ACCESS_TOKEN_KEY,
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../../helpers/constants.helper';
import { jwtDecode } from 'jwt-decode';
import { UserStore } from '../../store/user.store';
import { PayLoadData } from '../../interfaces/constants.interface';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  userStore = inject(UserStore);

  constructor() {}

  saveToken(token: string) {
    const decryptedToken = atob(token);
    const decodedToken: PayLoadData = jwtDecode(decryptedToken);
    this.setUserDetails(decodedToken);
    saveToLocalStorage(ACCESS_TOKEN_KEY, token);
  }

  getToken(): string | null {
    const token = getFromLocalStorage(ACCESS_TOKEN_KEY);

    if (token) {
      const decryptedToken = atob(token);
      const decodedToken: PayLoadData = jwtDecode(decryptedToken);
      this.setUserDetails(decodedToken);
      return decryptedToken;
    }

    return null;
  }

  removeToken() {
    removeFromLocalStorage(ACCESS_TOKEN_KEY);
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
