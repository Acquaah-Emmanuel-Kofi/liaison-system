import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  output,
  Renderer2,
  signal,
} from '@angular/core';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { BrandComponent } from '../brand/brand.component';
import { setPageHeader } from '../../helpers/functions.helper';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderTitleComponent } from '../header-title/header-title.component';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'liaison-navbar',
  standalone: true,
  imports: [ProfileCardComponent, BrandComponent, HeaderTitleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentPage = signal<string>('');
  toggleSidebar = output<void>();
  isProfileToggled: boolean = false;
  private _router = inject(Router);
  private renderer = inject(Renderer2);
  private hostElement = inject(ElementRef);

  private userStore = inject(UserStore);

  public username = computed(
    () => this.userStore.firstName() + ' ' + this.userStore.lastName()
  );
  public userRole = computed(() => this.userStore.role());

  constructor() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routePage();
      }
    });
  }

  ngOnInit(): void {
    this.routePage();
    this.renderer.listen('document', 'click', (event) =>
      this.onClickOutside(event)
    );
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

  onClickOutside(event: Event) {
    if (
      this.isProfileToggled &&
      !this.hostElement.nativeElement.contains(event.target)
    ) {
      this.isProfileToggled = false;
    }
  }

  onMouseLeave() {
    this.isProfileToggled = false;
  }

  getProfileMenu(menu: string): void {}
}
