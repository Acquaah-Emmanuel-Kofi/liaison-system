import {Component, inject} from '@angular/core';
import { SelectFilterComponent } from '../../../../../../shared/components/select-filter/select-filter.component';
import {Router, RouterLink} from "@angular/router";
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';
import {StudentTableService} from "../../../../service/students-table/student-table.service";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {studentsQueryKey} from "../../../../../../shared/helpers/query-keys.helper";

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [SearchbarComponent, SelectFilterComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  studentService = inject(StudentTableService)
  toggledFilterButton: boolean = false;
  route = inject(Router);
  searchValue = ''


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

  query = injectQuery(() => ({
    queryKey: [...studentsQueryKey.data(),],
    queryFn: () => this.studentService.searchStudent(this.searchValue),
  }));

  toggleFilterButton() {
    this.toggledFilterButton = !this.toggledFilterButton;
  }

  getOptionSelected(value: string) {
    console.log('Option selected:', value);
  }

  navigate() {
    this.route.navigate(['admin/students/upload']);
  }

  handleSearchTerm(value: string) {
    this.searchValue = value;
    if (this.searchValue) {
      // Refetch student search results based on search term
      this.query.refetch().then(() => {
        const results = this.query.data();
        this.studentService.updateSearchResults(results);
      });
    }

  }
}
