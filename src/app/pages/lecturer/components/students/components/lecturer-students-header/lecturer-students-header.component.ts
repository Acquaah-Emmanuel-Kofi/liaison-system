import { Component, inject, output } from '@angular/core';
import { facultiesAndDepartments } from '../../../../../../shared/helpers/constants.helper';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { LoaderModalComponent } from '../../../../../../shared/components/loader-modal/loader-modal/loader-modal.component';

@Component({
  selector: 'liaison-lecturer-students-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    DropdownModule,
    FormsModule,
    LoaderModalComponent,
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

  public _dashboardService = inject(DashboardService);

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

  downloadReport() {
    const fileName = 'Student Supervision Report.xlsx';
    this._dashboardService.downloadFile(fileName);
  }
}
