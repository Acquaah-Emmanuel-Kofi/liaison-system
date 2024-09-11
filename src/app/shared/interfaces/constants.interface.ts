export interface ILinks {
  label: string;
  link: string;
}

export interface IStartCard {
  title: string;
  number: number;
  iconSrc: string;
  navigateTo: string;
}

export interface PayLoadData {
  jti: string;
  role: string;
  firstname: string;
  lastname: string;
  sub: string;
  profilePicture: string;
  phoneNumber: number;
}