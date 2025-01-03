import { Component, inject, output, signal } from '@angular/core';
import { facultiesAndDepartments } from '../../../../../../shared/helpers/constants.helper';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { LoaderModalComponent } from '../../../../../../shared/components/loader-modal/loader-modal/loader-modal.component';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'liaison-lecturer-students-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    DropdownModule,
    FormsModule,
    LoaderModalComponent,
    ToastModule,
  ],
  templateUrl: './lecturer-students-header.component.html',
  styleUrl: './lecturer-students-header.component.scss',
})
export class LecturerStudentsHeaderComponent {
  searchValue = output<string>();
  filterValues = output<{ faculty: string; department: string }>();
  refetch = output<void>();
  isLoading = signal<boolean>(false);

  toggledFilters: boolean = false;

  facultyFilterOptions: { name: string; value: string }[] = [];
  departmentsFilterOptions: { name: string; value: string }[] = [];

  selectedFaculty: string | null = null;
  selectedDepartment: string | null = null;

  facultiesAndDepartments: Record<string, { name: string; value: string }[]> =
    {};

  private _dashboardService = inject(DashboardService);
  private _messageService = inject(MessageService);

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
    this.isLoading.set(true);

    const fileName = 'Student Supervision Report.xlsx';
    this._dashboardService
      .downloadFile(fileName)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: () => {
          this.showAlert('success', 'File downloaded successfully!');
        },
        error: (error) => {
          this.showAlert('error', 'File download failed');
          console.error('File download failed:', error);
        },
      });
  }

  showAlert(type: 'error' | 'success', message: string) {
    this._messageService.add({
      severity: type,
      summary: type === 'success' ? 'Success' : 'Error',
      detail: message,
    });
  }
}
