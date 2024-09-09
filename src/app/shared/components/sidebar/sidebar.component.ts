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
import {SidebarService} from "../../services/sidebar/sidebar.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'liaison-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandComponent, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy{
  closeEvent = output<void>();
  toggled = input.required<boolean>();
  links = input.required<INavLinks[]>();

  // Remove local isCollapsed variable; use the service instead
  currentRoute = signal<string>('');

  private _router = inject(Router);
  protected sidebarService = inject(SidebarService);
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

  // Use the service to toggle collapse state
  toggleCollapse() {
    this.sidebarService.toggleCollapse();
  }

  // Method to close the sidebar
  public closeSidebar() {
    this.closeEvent.emit();
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
