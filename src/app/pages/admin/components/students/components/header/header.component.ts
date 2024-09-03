import { Component } from '@angular/core';
import { HeaderTitleComponent } from '../../../../../../shared/components/header-title/header-title.component';

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [HeaderTitleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  toggledFilterButton: boolean = false;

  toggleFilterButton() {
    this.toggledFilterButton = !this.toggledFilterButton;
  }
}
