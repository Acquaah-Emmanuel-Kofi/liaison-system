import { Component, OnInit, output } from '@angular/core';
import { SelectFilterComponent } from '../../../../../../shared/components/select-filter/select-filter.component';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';
import { facultiesAndDepartments } from '../../../../../../shared/helpers/constants.helper';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    SelectFilterComponent,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  searchValue = output<string>();
  filterValues = output<{ faculty: string; department: string }>();
  refetch = output<void>();

  toggledFilters: boolean = false;

  facultyFilterOptions: { name: string; value: string }[] = [];
  departmentsFilterOptions: { name: string; value: string }[] = [];

  selectedFaculty: string | null = null;
  selectedDepartment: string | null = null;

  facultiesAndDepartments: Record<string, { name: string; value: string }[]> =
    {};

  constructor() {
    this.facultiesAndDepartments = facultiesAndDepartments;
  }

  ngOnInit() {
    this.facultyFilterOptions = Object.keys(this.facultiesAndDepartments).map(
      (faculty) => ({
        name: faculty,
        value: faculty,
      })
    );
  }

  toggleFilter() {
    this.toggledFilters = !this.toggledFilters;
  }

  onFacultyChange(faculty: string) {
    this.departmentsFilterOptions = this.facultiesAndDepartments[faculty] || [];
    this.selectedDepartment = null;
  }

  emitFilterValue() {
    const selectedData = {
      faculty: this.selectedFaculty ?? '',
      department: this.selectedDepartment ?? '',
    };

    this.filterValues.emit(selectedData);
  }

  handleSearchTerm(value: string) {
    this.searchValue.emit(value);
  }
}
