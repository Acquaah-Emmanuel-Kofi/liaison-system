import {Component, inject, input, OnDestroy, output, signal} from '@angular/core';
import { INavLinks } from './sidebar.interface';
import {
  Event,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { BrandComponent } from '../brand/brand.component';

@Component({
  selector: 'liaison-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnDestroy{
  closeEvent = output<void>();
  toggled = input.required<boolean>();
  links = input.required<INavLinks[]>();

  isCollapsed = false;

  currentRoute = signal<string>('');

  private _router = inject(Router);
  private _routerSubscription!: Subscription;

  constructor() {
    this._routerSubscription = this._router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute.set(event.url);
        }
      });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  public closeSidebar() {
    this.closeEvent.emit();
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
