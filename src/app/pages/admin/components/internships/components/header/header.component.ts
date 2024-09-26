import { Component, OnInit, output } from '@angular/core';
import { SelectFilterComponent } from '../../../../../../shared/components/select-filter/select-filter.component';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';
import { facultiesAndDepartments } from '../../../../../../shared/helpers/constants.helper';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    SelectFilterComponent,
    DropdownModule,
    FormsModule,
    CalendarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  searchValue = output<string>();
  statusFilterValue = output<'IN_PROGRESS' | 'COMPLETED'>();
  dateFilterValue = output<{ startDate: string; endDate: string }>();
  filterValues = output<{ faculty: string; department: string }>();
  refetch = output<void>();

  toggledFilters: boolean = false;

  facultyFilterOptions: { name: string; value: string }[] = [];
  departmentsFilterOptions: { name: string; value: string }[] = [];

  selectedFaculty: string | null = null;
  selectedDepartment: string | null = null;

  facultiesAndDepartments: Record<string, { name: string; value: string }[]> =
    {};

  rangeDates: Date[] | undefined;

  statusFilterOptions: { name: string; value: string }[] = [
    {
      name: 'Completed',
      value: 'COMPLETED',
    },
    {
      name: 'In Progress',
      value: 'IN_PROGRESS',
    },
  ];

  selectedStatus: string | null = null;

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

  emitDateValue(dates: string[]) {
    const datesValues = {
      startDate: dates[0],
      endDate: dates[1],
    };

    this.dateFilterValue.emit(datesValues);
  }

  emitStatusValue(value: 'IN_PROGRESS' | 'COMPLETED') {
    this.statusFilterValue.emit(value);
  }

  refetchData() {
    this.refetch.emit();
  }

  clearFilters() {
    this.selectedFaculty = null;
    this.selectedDepartment = null;
    this.rangeDates = undefined;
    this.selectedStatus = null;
  }

  handleSearchTerm(value: string) {
    this.searchValue.emit(value);
  }
}
