import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatCardComponent } from './shared/components/stat-card/stat-card.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { INavLinks } from './shared/components/sidebar/sidebar.interface';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './pages/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    StatCardComponent,
    SidebarComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'liaison-system';
  plkisns!: INavLinks[];
}
