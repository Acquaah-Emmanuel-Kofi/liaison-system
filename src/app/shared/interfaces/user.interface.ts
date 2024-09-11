export enum Role {
  ADMIN = 'ADMIN',
  LECTURER = 'LECTURER',
  STUDENT = 'STUDENT',
}

export interface IUser {
  firstName: string;
  middleName?: string;
  lastName: string;
  role: string;
  email: string;
  phoneNumber: number;
  id: string;
}
