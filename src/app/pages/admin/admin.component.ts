import {Component, inject} from '@angular/core';
import { INavLinks } from '../../shared/components/sidebar/sidebar.interface';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { ADMIN_NAVLINKS } from '../../shared/helpers/navlinks.helper';
import {AsyncPipe} from "@angular/common";
import {SidebarService} from "../../shared/services/sidebar/sidebar.service";

@Component({
  selector: 'liaison-admin',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  protected sidebarService = inject(SidebarService);

  close = false
  isSidebarVisible: boolean = true;

  links: INavLinks[] = ADMIN_NAVLINKS;

  public toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
