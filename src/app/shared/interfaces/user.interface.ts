export enum Role {
  ADMIN = 'ADMIN',
  LECTURER = 'LECTURER',
  STUDENT = 'STUDENT',
}

export interface IUser {
  firstName: string;
  otherName?: string;
  lastName: string;
  role: string;
  email: string;
  phone: string;
  id: string;
}
