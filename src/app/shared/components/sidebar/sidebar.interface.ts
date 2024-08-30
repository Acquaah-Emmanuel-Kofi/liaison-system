export interface INavLinks {
  links: NavLink[];
}

type NavLink = {
  title: string;
  defaultIconSrc: string;
  routerLink: string;
};
