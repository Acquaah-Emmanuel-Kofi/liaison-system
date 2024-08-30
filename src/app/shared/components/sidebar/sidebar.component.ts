import { Component, input, output } from '@angular/core';
import { INavLinks } from './sidebar.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'liaison-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  closeEvent = output<void>();
  toggled = input.required<boolean>();
  links = input.required<INavLinks[]>();

  closeSidebar() {
    this.closeEvent.emit();
  }
}
