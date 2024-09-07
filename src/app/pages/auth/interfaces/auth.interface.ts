import { ICommonResponse } from '../../../shared/interfaces/response.interface';
import { IUser } from '../../../shared/interfaces/user.interface';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IUserData extends IUser {
  id: string;
  token: string;
}

export interface ILoginResponse extends ICommonResponse {
  data: IUserData;
}
