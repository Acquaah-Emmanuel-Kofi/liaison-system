import {Component, inject, OnInit} from '@angular/core';
import {SearchbarComponent} from "../../../../../../shared/components/searchbar/searchbar.component";
import {SelectFilterComponent} from "../../../../../../shared/components/select-filter/select-filter.component";
import {StudentTableService} from "../../../../service/students-table/student-table.service";
import {Router} from "@angular/router";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {lecturerListQueryKey, studentsQueryKey} from "../../../../../../shared/helpers/query-keys.helper";
import {ModalContainerComponent} from "../../../../../../shared/components/modal-container/modal-container.component";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {RegionService} from "../../../../../../shared/services/regions/regions.service";
import {ZoneService} from "../../service/zone.service";
import {lectureListResponse} from "../../zone.interface";
import {reset} from "@angular-architects/ngrx-toolkit/lib/with-devtools";

@Component({
  selector: 'liaison-zone-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    SelectFilterComponent,
    ModalContainerComponent,
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './zone-header.component.html',
  styleUrl: './zone-header.component.scss'
})
export class ZoneHeaderComponent implements OnInit {
  zoneService = inject(ZoneService)
  studentService = inject(StudentTableService)
  regionService = inject(RegionService)
  fb = inject(FormBuilder)
  toggledFilterButton: boolean = false;
  route = inject(Router);
  searchValue = '';
  isModalOpened: boolean = false;
  zoneName = '';
  selectedRegion = '';
  isAddMoreTriggered: boolean = false;
  regions: string[] = [];
  lecturers: lectureListResponse[] = [];
  addZoneForm!: FormGroup;

  constructor() {
    this.addZoneForm = this.fb.group({
      zones: this.fb.array([this.createZonesForm()])
    });
  }

  ngOnInit(): void {
    this.regions = this.regionService.getRegions();
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
      const  response = await this.zoneService.getAllLectures()
      this.lecturers = response.data
      return response
    }
  }));


  studentsQuery = injectQuery(() => ({
    queryKey: [...studentsQueryKey.data(), this.searchValue],
    queryFn: () => this.studentService.searchStudent(this.searchValue),
    enabled: false,
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
      zoneLead: ['', Validators.required],
      lecturerIds: ['', Validators.required],
    });
  }

  addZone() {
    this.zones.push(this.createZonesForm())
    this.isAddMoreTriggered = true
  }

  removeZone(i: number) {
    this.zones.removeAt(i);
  }

  handleSearchTerm(value: string) {
    this.searchValue = value;
    if (this.searchValue) {
      this.studentsQuery.refetch().then(() => {
        const results = this.studentsQuery.data();
        this.studentService.updateSearchResults(results);
      });
    }
  }

  onSubmit() {
    if (this.addZoneForm.valid) {
      console.log('Submitted Form Data:', this.addZoneForm.value);
      this.closeModal();
    } else {
      console.log('Form is invalid');
    }
  }
}
