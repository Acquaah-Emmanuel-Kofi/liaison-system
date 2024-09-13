import {
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
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
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'liaison-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    BrandComponent,
    AsyncPipe,
    InputSwitchModule,
    NgClass,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  isInternTypeSwitch: boolean | undefined;
  closeEvent = output<void>();
  toggled = input.required<boolean>();
  links = input.required<INavLinks[]>();

  dropdownState: { [key: string]: boolean } = {};

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

  ngOnInit(): void {
    this.links().forEach((navLink) => {
      this.dropdownState[navLink.routerLink] = false;
    });
  }

  isDropdownOpen(navLinkId: string) {
    return this.dropdownState[navLinkId];
  }

  public openDropDownOnClick(navLinkId: string) {
    this.dropdownState[navLinkId] = !this.dropdownState[navLinkId];
  }

  toggleCollapse() {
    this.sidebarService.toggleCollapse();
  }

  toggleInternType() {
    this.sidebarService.toggleInterType();
  }

  public closeSidebar() {
    this.closeEvent.emit();
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }
}
