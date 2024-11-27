import { Component, inject } from '@angular/core';
import { ILinks } from '../../../../interfaces/constants.interface';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../pages/auth/services/auth/auth.service';
import { UserStore } from '../../../../store/user.store';

@Component({
  selector: 'liaison-profile-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent {
  userStore = inject(UserStore);
  _authService = inject(AuthService);
  _router = inject(Router);

  getUserRole(): string {
    return this.userStore.role().toLowerCase();
  }
  

  cardItems: ILinks[] = [
    {
      label: 'Profile',
      link: `/${this.getUserRole()}/profile`,
    },
    {
      label: 'Settings',
      link: `/${this.getUserRole()}/settings`,
    },
  ];

  logout() {
    this._authService.logout();
  }
}
