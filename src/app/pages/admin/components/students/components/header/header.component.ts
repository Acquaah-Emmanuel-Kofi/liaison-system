import { Component } from '@angular/core';

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  toggledFilterButton: boolean = false

  toggleFilterButton() {
    this.toggledFilterButton =!this.toggledFilterButton
  }
}
