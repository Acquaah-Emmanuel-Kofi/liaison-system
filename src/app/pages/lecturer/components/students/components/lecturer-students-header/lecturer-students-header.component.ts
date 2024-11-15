import { Component, inject, output } from '@angular/core';
import { StudentTableService } from '../../../../../admin/service/students-table/student-table.service';
import { Router, RouterLink } from '@angular/router';
import { facultiesAndDepartments } from '../../../../../../shared/helpers/constants.helper';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SelectFilterComponent } from '../../../../../../shared/components/select-filter/select-filter.component';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';

@Component({
  selector: 'liaison-lecturer-students-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    SelectFilterComponent,
    RouterLink,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './lecturer-students-header.component.html',
  styleUrl: './lecturer-students-header.component.scss',
})
export class LecturerStudentsHeaderComponent {
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

  studentService = inject(StudentTableService);
  route = inject(Router);

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

  refetchData() {
    this.refetch.emit();
  }

  clearFilters() {
    this.selectedFaculty = null;
    this.selectedDepartment = null;
  }

  handleSearchTerm(value: string) {
    this.searchValue.emit(value);
  }
}
