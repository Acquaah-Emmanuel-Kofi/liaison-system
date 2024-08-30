import { Component, output } from '@angular/core';
import { ILinks } from '../../../../interfaces/links.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'liaison-profile-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  emitMenu = output<string>();

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
}
