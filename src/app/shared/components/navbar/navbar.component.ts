import { Component, output } from '@angular/core';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

@Component({
  selector: 'liaison-navbar',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  toggleSidebar = output<void>();
  isProfileToggled: boolean = false;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleProfile(): void {
    this.isProfileToggled = !this.isProfileToggled;
  }

  getProfileMenu(menu: string): void {}
}
