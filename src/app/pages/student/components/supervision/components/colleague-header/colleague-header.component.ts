import {Component, OnInit, output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {SearchbarComponent} from "../../../../../../shared/components/searchbar/searchbar.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'liaison-colleague-header',
  standalone: true,
  imports: [
    DropdownModule,
    SearchbarComponent,
    FormsModule
  ],
  templateUrl: './colleague-header.component.html',
  styleUrl: './colleague-header.component.scss'
})
export class ColleagueHeaderComponent implements OnInit{
  toggledFilters: boolean = false;
  searchValue = output<string>();

  refetch = output<void>();
  filterValues = output<{ faculty: string; department: string }>();

  facultyFilterOptions: { name: string; value: string }[] = [];
  departmentsFilterOptions: { name: string; value: string }[] = [];

  selectedFaculty: string | null = null;
  selectedDepartment: string | null = null;

  facultiesAndDepartments: Record<string, { name: string; value: string }[]> = {};

  ngOnInit() {
    this.facultyFilterOptions = Object.keys(this.facultiesAndDepartments).map(
      (faculty) => ({
        name: faculty,
        value: faculty,
      })
    );
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

  toggleFilter() {
    this.toggledFilters = !this.toggledFilters;
  }

  handleSearchTerm(value: string) {
    this.searchValue.emit(value);
  }
}
