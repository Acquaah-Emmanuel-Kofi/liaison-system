import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private encryptionKey: string;

  constructor() {
    this.encryptionKey = this.generateKey();
  }

  /**
   * Method to generate a random key for encryption on each login
   */
  generateKey(): string {
    return CryptoJS.lib.WordArray.random(32).toString(); // 256-bit key
  }

  /**
   * Encrypts a given token using AES encryption with a randomly generated key.
   * The encryption key is stored in the `encryptionKey` property of the class.
   * @param token - The token to be encrypted. It should be a string.
   * @returns The encrypted token as a string.
   */
  encryptToken(token: string): string {
    const encrypted = CryptoJS.AES.encrypt(
      token,
      environment.SECRET_KEY
    ).toString();
    return encrypted;
  }

  /**
   *  Decrypts a given encrypted token using AES decryption with a randomly generated key.
   * The encryption key is stored in the `encryptionKey` property of the class.
   * @param encryptedToken - The encrypted token to be decrypted. It should be a string.
   * @returns The decrypted token as a string.
   */
  decryptToken(encryptedToken: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, environment.SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
}
