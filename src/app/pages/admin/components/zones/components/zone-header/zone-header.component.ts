import { Component, inject, OnInit, output, signal } from '@angular/core';
import { SearchbarComponent } from '../../../../../../shared/components/searchbar/searchbar.component';
import { StudentTableService } from '../../../../service/students-table/student-table.service';
import { Router } from '@angular/router';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import {
  lecturerListQueryKey,
  zonesQueryData,
} from '../../../../../../shared/helpers/query-keys.helper';
import { ModalContainerComponent } from '../../../../../../shared/components/modal-container/modal-container.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf } from '@angular/common';
import { RegionService } from '../../../../../../shared/services/regions/regions.service';
import { TownData, ZoneService } from '../../service/zone.service';
import { lectureListResponse } from '../../zone.interface';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SidebarService } from '../../../../../../shared/services/sidebar/sidebar.service';
import { DropdownModule } from 'primeng/dropdown';
import { LoaderModalComponent } from '../../../../../../shared/components/loader-modal/loader-modal/loader-modal.component';

@Component({
  selector: 'liaison-zone-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    ModalContainerComponent,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule,
    LoaderModalComponent
  ],
  templateUrl: './zone-header.component.html',
  styleUrl: './zone-header.component.scss',
  providers: [MessageService],
})
export class ZoneHeaderComponent implements OnInit {
  zoneService = inject(ZoneService);
  studentService = inject(StudentTableService);
  regionService = inject(RegionService);
  messageService = inject(MessageService);
  protected sidebarService = inject(SidebarService);

  fb = inject(FormBuilder);
  toggledFilterButton: boolean = false;
  route = inject(Router);
  searchValue = output<string>();
  filterValue = output<string>();
  isModalOpened: boolean = false;
  isTownModalOpen = false;
  zoneName = '';
  selectedRegion = '';
  isAddMoreTriggered: boolean = false;
  regions: string[] = [];
  towns: string[] = [];
  lecturers: lectureListResponse[] = [];
  selectedTowns: { [key: number]: string[] } = {};
  selectedLecturers: { [key: number]: string[] } = {};
  lecturerNames: string[] = [];
  defaultPlaceholder = 'Select town(s)';
  addZoneForm!: FormGroup;
  enteredRegion = '';
  enteredTown = ' ';
  currentZoneIndex: number = 0;
  isTownListOpened: any;
  isLecturerListOpened!: boolean;
  internshipType!: boolean;
  toggledFilters: boolean = false;
  facultyFilterOptions: { name: string; value: string }[] = [];
  departmentsFilterOptions: { name: string; value: string }[] = [];
  filterValues = output<{ faculty: string; department: string }>();
  refetch = output<void>();
  selectedFilterRegion: string | null = null;
  selectedDepartment: string | null = null;

  facultiesAndDepartments: Record<string, { name: string; value: string }[]> =
    {};

  constructor() {
    this.addZoneForm = this.fb.group({
      zones: this.fb.array([this.createZonesForm()]),
    });
  }

  toggleTownList(event: Event, index: number) {
    event.stopPropagation();
    this.isTownListOpened = index;
    this.towns = this.getAvailableTownsForZone(index);
  }
  // openTownList( event: Event, index: number) {
  //   event.stopPropagation();
  //   this.currentZoneIndex = index;
  //   this.isTownListOpened = !this.isTownListOpened;
  //
  //   const townFormArray = this.zones.at(index).get('towns') as FormArray;
  //   this.selectedTowns = townFormArray.controls.map(control => control.value);
  // }

  rawRegions: any;
  ngOnInit(): void {
    this.rawRegions = this.regionService.getRawRegions();
    this.fetchRegions();
    this.sidebarService.isSwitched$.subscribe((value: boolean) => {
      this.internshipType = value;
    });
    this.lecturesQuery.refetch();
  }

  async fetchRegions() {
    this.regions = await this.regionService.getRegions();
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

  lecturesQuery = injectQuery(() => ({
    queryKey: [...lecturerListQueryKey.data()],
    queryFn: async () => {
      const response = await this.zoneService.getAllLectures();
      this.lecturers = response.data;
      return response;
    },
  }));

  toggleFilterButton() {
    this.toggledFilterButton = !this.toggledFilterButton;
  }

  getOptionSelected(value: string) {
    console.log('Option selected:', value);
  }

  closeModal() {
    this.isModalOpened = false;
    this.clearZonesArray();
  }
  closeTownModal() {
    this.isTownModalOpen = false;
  }

  closeTownList() {
    this.isTownListOpened = false;
  }

  clearZonesArray() {
    const zonesArray = this.zones;
    while (zonesArray.length !== 0) {
      zonesArray.removeAt(0);
    }
    this.addZone();
  }

  get zones(): FormArray {
    return this.addZoneForm.get('zones') as FormArray;
  }

  createZonesForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      region: ['', Validators.required],
      towns: this.fb.array([], Validators.required),
      zoneLead: ['', Validators.required],
      lecturerIds: this.fb.array([], Validators.required),
    });
  }

  addZone() {
    this.zones.push(this.createZonesForm());
    this.isAddMoreTriggered = true;
  }

  removeZone(i: number) {
    this.zones.removeAt(i);
  }

  getTownsFormArray(index: number): FormArray {
    return this.zones.at(index).get('towns') as FormArray;
  }

  hasRegionSelected(zoneIndex: number): boolean {
    const zoneGroup = this.zones.at(zoneIndex);
    const regionValue = zoneGroup.get('region')?.value;
    return !!regionValue && regionValue.trim() !== '';
  }

  // Get available towns based on the selected region for a specific zone
  getAvailableTownsForZone(zoneIndex: number): string[] {
    if (!this.hasRegionSelected(zoneIndex)) {
      return [];
    }
    // Return towns based on the selected region
    const selectedRegion = this.zones.at(zoneIndex).get('region')?.value;
    return this.towns;
  }

  openTownList(event: any, zoneIndex: number) {
    this.currentZoneIndex = zoneIndex;
    this.isTownListOpened = true;
  }
  //
  // getAvailableTownsForZone(zoneIndex: number): string[] {
  //   const selectedRegion = this.zones.at(zoneIndex).get('region')?.value;
  //   return this.regionService.getTownsByRegion(selectedRegion);
  // }

  toggleTownSelection(town: string, index: number): void {
    const townsFormArray = this.getTownsFormArray(index);
    const townIndex = townsFormArray.controls.findIndex(
      (control) => control.value === town
    );

    if (this.selectedTowns[index]?.includes(town)) {
      this.selectedTowns[index] = this.selectedTowns[index].filter(
        (t) => t !== town
      );
      if (townIndex >= 0) {
        townsFormArray.removeAt(townIndex);
      }
    } else {
      if (!this.selectedTowns[index]) {
        this.selectedTowns[index] = [];
      }
      this.selectedTowns[index].push(town);
      townsFormArray.push(this.fb.control(town));
    }
  }

  toggleLecturesSelection(lecturer: lectureListResponse, index: number): void {
    const lecturerFormArray = this.zones
      .at(index)
      .get('lecturerIds') as FormArray;
    const lecturerIndex = lecturerFormArray.controls.findIndex(
      (control) => control.value === lecturer.id
    );

    if (this.selectedLecturers[index]?.includes(lecturer.name)) {
      this.selectedLecturers[index] = this.selectedLecturers[index].filter(
        (l) => l !== lecturer.name
      );
      if (lecturerIndex >= 0) {
        lecturerFormArray.removeAt(lecturerIndex);
      }
    } else {
      if (!this.selectedLecturers[index]) {
        this.selectedLecturers[index] = [];
      }
      this.selectedLecturers[index].push(lecturer.name);
      lecturerFormArray.push(this.fb.control(lecturer.id));
    }
  }

  getTownsForZone(zoneIndex: number): string[] {
    return this.selectedTowns[zoneIndex] || [];
  }

  getLecturersForZone(zoneIndex: number): string[] {
    return this.selectedLecturers[zoneIndex] || [];
  }

  onRegionChange(index: number): void {
    const townsFormArray = this.getTownsFormArray(index);
    const region = this.zones.at(index).get('region') as FormArray;
    this.getTowns(region);
    townsFormArray.clear();
    this.selectedTowns[index] = [];
  }

  async getTowns(region: any) {
    this.towns = await this.regionService.getTownsByRegion(region.value);
  }

  // onRegionChange(index:number){
  //   const region = this.zones.at(index).get('region')?.value
  //   this.towns = this.regionService.getTownsByRegion(region)
  //   const townFormArray = this.zones.at(index).get('towns') as FormArray;
  //
  // }

  handleSearchTerm(value: string) {
    this.searchValue.emit(value);
  }

  zoneMutation = injectMutation((client) => ({
    mutationFn: async ({ formData }: { formData: any }) => {
      this.isModalOpened = false;

      return await lastValueFrom(this.zoneService.submitZone(formData));
    },
    onSuccess: (data: any) => {
      client.invalidateQueries({ queryKey: zonesQueryData.all }).then();

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: data.message || 'Zone submitted successfully',
      });
      this.closeModal();
    },
    onError: (error: any) => {
      this.isModalOpened = true;
      
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message || 'An error occurred while submitting the zone',
      });
      this.closeModal();
    },
  }));

  TownMutation = injectMutation(() => ({
    mutationFn: async ({ townData }: { townData: TownData }) => {
      return await lastValueFrom(this.zoneService.submitTown(townData));
    },
    onSuccess: (data: any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: data.message || 'Town submitted successfully',
      });
      this.closeTownModal();
    },
    onError: (error: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          error.message || 'An error occurred while submitting the new town',
      });
      this.closeTownModal();
    },
  }));

  onTownSubmit(newForm: NgForm) {
    if (newForm.invalid) {
      return;
    }
    const townData = {
      region: this.enteredRegion,
      towns: [this.enteredTown],
    };

    this.TownMutation.mutate({ townData });
  }

  onSubmit() {
    if (this.addZoneForm.valid) {
      const formData = this.addZoneForm.get('zones')?.value;
      this.zoneMutation.mutate({ formData });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: "Couldn't Submit",
        detail: 'Form is invalid: make sure all form fields are filled',
      });
    }
  }

  closeDropdown() {
    this.isTownListOpened = false;
  }

  toggleFilter() {
    this.toggledFilters = !this.toggledFilters;
  }

  onFacultyChange(Region: string) {
    this.filterValue.emit(Region);
  }

  refetchData() {
    this.refetch.emit();
  }

  clearFilters() {
    this.selectedFilterRegion = null;
    this.filterValue.emit('');
  }
}
