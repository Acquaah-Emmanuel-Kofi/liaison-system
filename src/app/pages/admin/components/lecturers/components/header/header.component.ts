import { Component, inject, OnInit, output } from '@angular/core';
import { SelectFilterComponent } from '../../../../../../shared/components/select-filter/select-filter.component';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';
import { ModalContainerComponent } from '../../../../../../shared/components/modal-container/modal-container.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgForOf } from '@angular/common';
import { getFirstTwoInitials } from '../../../../../../shared/helpers/functions.helper';
import { lectureListResponse } from '../../../zones/zone.interface';
import { lecturerListQueryKey } from '../../../../../../shared/helpers/query-keys.helper';
import { ZoneService } from '../../../zones/service/zone.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { DropdownModule } from 'primeng/dropdown';
import { facultiesAndDepartments } from '../../../../../../shared/helpers/constants.helper';

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    SelectFilterComponent,
    ModalContainerComponent,
    ReactiveFormsModule,
    NgForOf,
    NgClass,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  searchValue = output<string>();
  filterValues = output<{ faculty: string; department: string }>();
  refetch = output<void>()

  isAddMoreTriggered: boolean = false;
  isModalOpened: boolean = false;
  addAssignLecturerForm!: FormGroup;
  isLeadListOpened: boolean = false;
  lecturers: lectureListResponse[] = [];

  toggledFilters: boolean = false;

  facultyFilterOptions: { name: string; value: string }[] = [];
  departmentsFilterOptions: { name: string; value: string }[] = [];

  selectedFaculty: string | null = null;
  selectedDepartment: string | null = null;

  facultiesAndDepartments: Record<string, { name: string; value: string }[]> =
    {};

  zoneService = inject(ZoneService);

  fb = inject(FormBuilder);

  constructor() {
    this.facultiesAndDepartments = facultiesAndDepartments;
    this.initForm();
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
    this.refetch.emit()
  }

  clearFilters() {
    this.selectedFaculty = null;
    this.selectedDepartment = null;
  }

  initForm() {
    this.addAssignLecturerForm = this.fb.group({
      assignLectures: this.fb.array([this.createAssignLecturerForm()]),
    });
  }

  get assignLectures(): FormArray {
    return this.addAssignLecturerForm.get('assignLectures') as FormArray;
  }

  createAssignLecturerForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      region: ['', Validators.required],
      zoneLead: ['', Validators.required],
      lecturerIds: ['', Validators.required],
    });
  }

  addAssignLecturer() {
    this.assignLectures.push(this.createAssignLecturerForm());
    this.isAddMoreTriggered = true;
  }

  removeAssignLecturer(index: number) {
    this.assignLectures.removeAt(index);
  }

  getNameInitials(name: string) {
    return getFirstTwoInitials(name);
  }

  lecturesQuery = injectQuery(() => ({
    queryKey: [...lecturerListQueryKey.data()],
    queryFn: async () => {
      const response = await this.zoneService.getAllLectures();
      this.lecturers = response.data;
      return response;
    },
  }));

  handleSearchTerm(value: string) {
    this.searchValue.emit(value);
  }

  closeModal() {
    this.isModalOpened = false;
    this.clearAssignLecturerArray();
  }

  clearAssignLecturerArray() {
    while (this.assignLectures.length !== 0) {
      this.assignLectures.removeAt(0);
    }
    this.addAssignLecturer();
  }

  onSubmit() {
    if (this.addAssignLecturerForm.valid) {
      console.log(this.addAssignLecturerForm.value);
    }
  }
}
