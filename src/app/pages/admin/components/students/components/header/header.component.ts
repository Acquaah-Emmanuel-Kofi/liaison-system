import {Component, inject, output} from '@angular/core';
import {SelectFilterComponent} from '../../../../../../shared/components/select-filter/select-filter.component';
import {Router, RouterLink} from "@angular/router";
import {SearchbarComponent} from '../../../../../../shared/components/searchbar/searchbar.component';
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
  searchValue = output<string>();


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
    this.route.navigate(['admin/students/upload']);
  }

  handleSearchTerm(value: string) {
    this.searchValue.emit(value);
  }
}
