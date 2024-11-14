import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from '../../shared/services/sidebar/sidebar.service';
import { LECTURER_NAVLINKS } from '../../shared/helpers/navlinks.helper';
import { INavLinks } from '../../shared/components/sidebar/sidebar.interface';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'liaison-lecturer',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, AsyncPipe],
  templateUrl: './lecturer.component.html',
  styleUrl: './lecturer.component.scss',
})
export class LecturerComponent {
  protected sidebarService = inject(SidebarService);

  close = true;
  isSidebarVisible: boolean = true;

  links: INavLinks[] = LECTURER_NAVLINKS;

  public toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
