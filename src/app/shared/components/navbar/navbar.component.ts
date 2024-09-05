import { Component, inject, OnInit, output, signal } from '@angular/core';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { BrandComponent } from '../brand/brand.component';
import { setPageHeader } from '../../helpers/functions.helper';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderTitleComponent } from '../header-title/header-title.component';

@Component({
  selector: 'liaison-navbar',
  standalone: true,
  imports: [ProfileCardComponent, BrandComponent, HeaderTitleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  currentPage = signal<string>('');
  toggleSidebar = output<void>();
  isProfileToggled: boolean = false;

  _router = inject(Router);

  ngOnInit(): void {
    this.routePage();
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routePage();
      }
    });
  }

  public routePage(): void {
    const page = setPageHeader(this._router.url);
    this.currentPage.set(page);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleProfile(): void {
    this.isProfileToggled = !this.isProfileToggled;
  }

  onMouseLeave() {
    this.isProfileToggled = false;
  }

  getProfileMenu(menu: string): void {}
}
