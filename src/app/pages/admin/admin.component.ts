import { Component, signal } from '@angular/core';
import { INavLinks } from '../../shared/components/sidebar/sidebar.interface';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ADMIN_NAVLINKS } from '../../shared/helpers/navlinks.helper';

@Component({
  selector: 'liaison-admin',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  isSidebarVisible: boolean = true;

  links: INavLinks[] = ADMIN_NAVLINKS;

  public toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
