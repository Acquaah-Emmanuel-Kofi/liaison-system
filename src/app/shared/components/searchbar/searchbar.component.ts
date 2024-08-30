import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'liaison-searchbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  searchTermValue = output<string>();
  searchTerm: string = '';

  handleSearchFilter(event: string) {
    this.searchTermValue.emit(event);
  }
}
