export enum Role {
  ADMIN = 'ADMIN',
  LECTURER = 'LECTURER',
  STUDENT = 'STUDENT',
}

export interface IUser {
  firstName: string;
  lastName: string;
  role: Role;
}
