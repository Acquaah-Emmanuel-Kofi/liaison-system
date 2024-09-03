import { Component, input } from '@angular/core';

@Component({
  selector: 'liaison-header-title',
  standalone: true,
  imports: [],
  templateUrl: './header-title.component.html',
  styleUrl: './header-title.component.scss',
})
export class HeaderTitleComponent {
  title = input.required<string>();
}
