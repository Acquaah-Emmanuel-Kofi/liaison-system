import {Component, inject} from '@angular/core';
import { HeaderTitleComponent } from '../../../../../../shared/components/header-title/header-title.component';
import { SelectFilterComponent } from '../../../../../../shared/components/select-filter/select-filter.component';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [HeaderTitleComponent, SelectFilterComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  toggledFilterButton: boolean = false;
  route = inject(Router)

  filterOptions: string[] = [
    'Computer Science',
    'Engineering',
    'Fashion Design',
    'Textiles Design',
    'Ceramic Design',
    'Painting Design',
    'Sculpture Design',
    'Graphic Design',
  ];

  toggleFilterButton() {
    this.toggledFilterButton = !this.toggledFilterButton;
  }

  getOptionSelected(value: string) {
    console.log('Option selected:', value);
  }

  navigate() {
      this.route.navigate(['admin/student-upload'])
  }
}
