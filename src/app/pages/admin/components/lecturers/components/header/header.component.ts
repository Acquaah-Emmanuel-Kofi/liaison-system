import { Component } from '@angular/core';
import { SelectFilterComponent } from '../../../../../../shared/components/select-filter/select-filter.component';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [SearchbarComponent, SelectFilterComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  toggledFilterButton: boolean = false;

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

  handleSearchTerm(value: string) {
    console.log(value);
  }
}
