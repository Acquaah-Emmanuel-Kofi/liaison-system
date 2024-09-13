export interface INavLinks {
  title: string;
  defaultIconSrc: string;
  routerLink: string;
  children?: {
    activeIconSrc?: string;
    defaultIconSrc?: string;
    title: string;
    routerLink: string;
  }[];
}
