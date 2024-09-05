import { inject, Injectable } from '@angular/core';
import {
  ACCESS_TOKEN_KEY,
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../../helpers/constants.helper';
import { CryptoService } from '../cryptojs/crypto.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _cryptoService = inject(CryptoService);

  constructor() {}

  saveToken(token: string) {
    const encryptedToken = this._cryptoService.encryptToken(token);

    saveToLocalStorage(ACCESS_TOKEN_KEY, encryptedToken);
  }
}
