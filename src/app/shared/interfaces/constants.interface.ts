export interface ILinks {
  label: string;
  link: string;
}

export interface IStartCard {
  title: string;
  count: number;
  iconSrc: string;
  navigateTo: string;
  show: boolean
}

export interface PayLoadData {
  jti: string;
  role: string;
  firstname: string;
  lastname: string;
  sub: string;
  profilePicture: string;
  phone: string;
}


export type NameValue = { name: string; value: string };