import { Component, EventEmitter, Output, inject } from '@angular/core';
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
  @Output() emitMenu = new EventEmitter<string>();

  userStore = inject(UserStore);
  _authService = inject(AuthService);
  _router = inject(Router);

  getUserRole(): string {
    return this.userStore.role().toLowerCase();
  }
  

  cardItems: ILinks[] = [
    {
      label: 'Your Profile',
      link: `/${this.getUserRole()}/profile`,
    },
    {
      label: 'Settings',
      link: `/${this.getUserRole()}/settings`,
    },
  ];
  

  onMenuClick(route: string): void {
    this._router.navigate([this.userStore.role(), route]);
    this.emitMenu.emit(route); 
  }

  logout() {
    this._authService.logout();
  }
}
