import { Component, inject, output } from '@angular/core';
import { ILinks } from '../../../../interfaces/links.interface';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../pages/auth/services/auth/auth.service';

@Component({
  selector: 'liaison-profile-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  emitMenu = output<string>();

  _authService = inject(AuthService);

  cardItems: ILinks[] = [
    {
      label: 'Your Profile',
      link: '/profile',
    },
    {
      label: 'Settings',
      link: '/settings',
    },
  ];

  onMenuClick(menu: string): void {
    this.emitMenu.emit(menu);
  }

  logout() {
    this._authService.logout();
  }
}
