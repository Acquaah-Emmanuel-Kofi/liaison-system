import { Component, inject, output } from '@angular/core';
import { SelectFilterComponent } from '../../../../../../shared/components/select-filter/select-filter.component';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';
import { ModalContainerComponent } from "../../../../../../shared/components/modal-container/modal-container.component";
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {getFirstTwoInitials} from "../../../../../../shared/helpers/functions.helper";
import {lectureListResponse} from "../../../zones/zone.interface";
import {lecturerListQueryKey} from "../../../../../../shared/helpers/query-keys.helper";
import {ZoneService} from "../../../zones/service/zone.service";
import {injectQuery} from "@tanstack/angular-query-experimental";

@Component({
  selector: 'liaison-header',
  standalone: true,
  imports: [SearchbarComponent, SelectFilterComponent, ModalContainerComponent, ReactiveFormsModule, NgForOf, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  toggledFilterButton: boolean = false;
  searchValue = output<string>();
  isAddMoreTriggered: boolean = false;
  isModalOpened: boolean = false;
  addAssignLecturerForm!: FormGroup;
  isLeadListOpened: boolean = false;
  zoneService = inject(ZoneService)
  lecturers: lectureListResponse[] = [];

  fb = inject(FormBuilder);

  constructor() {
    this.initForm();
  }

  initForm() {
    this.addAssignLecturerForm = this.fb.group({
      assignLectures: this.fb.array([this.createAssignLecturerForm()])
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
  imageUrl = '';

  toggleFilterButton() {
    this.toggledFilterButton = !this.toggledFilterButton;
  }

  getNameInitials(name: string) {
    return getFirstTwoInitials(name);
  }

  lecturesQuery = injectQuery(() => ({
    queryKey: [...lecturerListQueryKey.data()],
    queryFn: async () => {
      const  response = await this.zoneService.getAllLectures()
      this.lecturers = response.data
      return response
    }
  }));


  getOptionSelected(value: string) {
    console.log('Option selected:', value);
  }

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
      // Handle form submission
    }
  }
}
