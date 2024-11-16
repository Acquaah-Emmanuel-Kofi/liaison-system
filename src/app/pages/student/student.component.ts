import { Component, inject } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar/sidebar.service';
import { INavLinks } from '../../shared/components/sidebar/sidebar.interface';
import { STUDENT_NAVLINKS } from '../../shared/helpers/navlinks.helper';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'liaison-student',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, AsyncPipe],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss',
})
export class StudentComponent {
  protected sidebarService = inject(SidebarService);

  close = true;
  isSidebarVisible: boolean = true;

  links: INavLinks[] = STUDENT_NAVLINKS;

  public toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
