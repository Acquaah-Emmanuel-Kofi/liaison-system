import { ICommonResponse } from '../../../shared/interfaces/response.interface';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface ILoginResponse extends ICommonResponse {
  data: IToken;
}
