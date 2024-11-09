import {Component, inject, OnInit} from '@angular/core';
import {SearchbarComponent} from "../../../../../../shared/components/searchbar/searchbar.component";
import {SelectFilterComponent} from "../../../../../../shared/components/select-filter/select-filter.component";
import {StudentTableService} from "../../../../service/students-table/student-table.service";
import {Router} from "@angular/router";
import {injectMutation, injectQuery} from "@tanstack/angular-query-experimental";
import {lecturerListQueryKey, studentsQueryKey} from "../../../../../../shared/helpers/query-keys.helper";
import {ModalContainerComponent} from "../../../../../../shared/components/modal-container/modal-container.component";
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RegionService} from "../../../../../../shared/services/regions/regions.service";
import {ZoneService} from "../../service/zone.service";
import {lectureListResponse} from "../../zone.interface";
import {lastValueFrom} from "rxjs";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'liaison-zone-header',
  standalone: true,
  imports: [
    SearchbarComponent,
    SelectFilterComponent,
    ModalContainerComponent,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    ToastModule
  ],
  templateUrl: './zone-header.component.html',
  styleUrl: './zone-header.component.scss',
  providers: [MessageService]
})
export class ZoneHeaderComponent implements OnInit {
  zoneService = inject(ZoneService)
  studentService = inject(StudentTableService)
  regionService = inject(RegionService)
  messageService = inject(MessageService)
  fb = inject(FormBuilder)
  toggledFilterButton: boolean = false;
  route = inject(Router);
  searchValue = '';
  isModalOpened: boolean = false;
  zoneName = '';
  selectedRegion = '';
  isAddMoreTriggered: boolean = false;
  regions: string[] = [];
  towns: string[] = [];
  lecturers: lectureListResponse[] = [];
  selectedTowns: string[] = [];
  selectedLecturers: string[] = []
  lecturerNames: string[] = []
  defaultPlaceholder = "Select town(s)"
  addZoneForm!: FormGroup;
  currentZoneIndex: number = 0;
  isTownListOpened: any;
  isLecturerListOpened!: boolean;

  constructor() {
    this.addZoneForm = this.fb.group({
      zones: this.fb.array([this.createZonesForm()])
    });
  }

  toggleTownList(event: Event) {
    event.stopPropagation(); // Prevent modal close
    this.isTownListOpened = !this.isTownListOpened;
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
    this.zones.push(this.createZonesForm())
    this.isAddMoreTriggered = true
  }

  removeZone(i: number) {
    this.zones.removeAt(i);
  }


  toggleTownSelection(town: string, index: number): void {
    const townFormArray = this.zones.at(index).get('towns') as FormArray;
    const townIndex = townFormArray.controls.findIndex(control => control.value === town);

    if (this.selectedTowns.includes(town)) {
      this.selectedTowns = this.selectedTowns.filter(t => t !== town);
      if (townIndex >= 0) {
        townFormArray.removeAt(townIndex);
      }
    } else {
      this.selectedTowns.push(town);
      townFormArray.push(this.fb.control(town));
    }
  }

  toggleLecturesSelection(name:string ,id: string, index: number): void {
    const townFormArray = this.zones.at(index).get('lecturerIds') as FormArray;
    const townIndex = townFormArray.controls.findIndex(control => control.value === id);

    if (this.lecturerNames.includes(id)) {
      this.lecturerNames = this.lecturerNames.filter(t => t !== id);
      if (townIndex >= 0) {
        townFormArray.removeAt(townIndex);
      }
    } else {
      this.lecturerNames.push(name);
      townFormArray.push(this.fb.control(id));
    }
  }


  onRegionChange(index:number){
    const region = this.zones.at(index).get('region')?.value
    this.towns = this.regionService.getTownsByRegion(region)
    const townFormArray = this.zones.at(index).get('towns') as FormArray;
    // townFormArray.enable({onlySelf: true});
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


  zoneMutation = injectMutation(() => ({
    mutationFn: (data: any) =>
      lastValueFrom(this.zoneService.submitZone(data)),
    onSuccess: (data: any)=> {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      console.log(data)
      }
  }))


  onSubmit() {
    if (this.addZoneForm.valid) {
      this.zoneMutation.mutate(this.addZoneForm.get('zones')?.value);
      this.closeModal();
    } else {
      console.log('invalid')
      this.messageService.add({ severity: 'error', summary: "Couldn't Submit", detail: 'Form is invalid: make sure all form fields are filled'});
    }
  }

  openTownList( event: Event, index: number) {
    event.stopPropagation();
    this.currentZoneIndex = index;
    this.isTownListOpened = !this.isTownListOpened;

    const townFormArray = this.zones.at(index).get('towns') as FormArray;
    this.selectedTowns = townFormArray.controls.map(control => control.value);
  }

  closeDropdown() {
    this.isTownListOpened = false
  }
}
