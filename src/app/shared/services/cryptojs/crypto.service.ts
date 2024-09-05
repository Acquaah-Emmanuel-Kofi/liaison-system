import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

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
}
