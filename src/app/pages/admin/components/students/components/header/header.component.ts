import {Component, inject, OnInit, output} from '@angular/core';
import {SelectFilterComponent} from '../../../../../../shared/components/select-filter/select-filter.component';
import {Router, RouterLink} from "@angular/router";
import {SearchbarComponent} from '../../../../../../shared/components/searchbar/searchbar.component';
import {StudentTableService} from "../../../../service/students-table/student-table.service";
import { facultiesAndDepartments } from '../../../../../../shared/helpers/constants.helper';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    SelectFilterComponent,
    RouterLink,
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

  navigate() {
    this.route.navigate(['admin/students/upload']);
  }

  handleSearchTerm(value: string) {
    this.searchValue.emit(value);
  }
}
