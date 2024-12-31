import { Component, inject, input, signal } from '@angular/core';
import { IZone } from '../../../../../../shared/interfaces/response.interface';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { ZoneService } from '../../service/zone.service';
import { RegionService } from '../../../../../../shared/services/regions/regions.service';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NameValue } from '../../../../../../shared/interfaces/constants.interface';
import { lectureListResponse } from '../../zone.interface';
import { ModalContainerComponent } from '../../../../../../shared/components/modal-container/modal-container.component';
import {
  lecturerListQueryKey,
  zonesQueryData,
} from '../../../../../../shared/helpers/query-keys.helper';

@Component({
  selector: 'liaison-zone-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalContainerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './zone-details.component.html',
  styleUrl: './zone-details.component.scss',
  providers: [MessageService],
})
export class ZoneDetailsComponent {
  id = input.required<string>();
  isModalOpened: boolean = false;
  isAddMoreTriggered: boolean = false;
  isLecturerListOpened!: boolean;
  selectedLecturers: { [key: number]: string[] } = {};
  selectedTowns: { [key: number]: string[] } = {};
  currentZoneIndex: number = 0;
  lecturers = signal<lectureListResponse[]>([]);
  isTownListOpened: boolean = false;
  defaultPlaceholder = 'Select town(s)';
  towns = signal<string[]>([]);
  zoneData = signal<IZone>({} as IZone);
  rawRegions: NameValue[];
  regions: string[] = [];

  private _messageService = inject(MessageService);
  private _zoneService = inject(ZoneService);
  private _regionService = inject(RegionService);

  fb = inject(FormBuilder);

  addZoneForm: FormGroup;

  constructor() {
    this.addZoneForm = this.fb.group({
      zones: this.fb.array([this.updateZonesForm()]),
    });

    this.rawRegions = this._regionService.getRawRegions();
    this.fetchRegions();
  }

  async fetchRegions() {
    this.regions = await this._regionService.getRegions();
  }

  lecturesQuery = injectQuery(() => ({
    queryKey: [...lecturerListQueryKey.data()],
    queryFn: async () => {
      const response = await this._zoneService.getAllLectures();
      this.lecturers.set(response.data);
      return response;
    },
  }));

  zoneDeatilsQuery = injectQuery(() => ({
    queryKey: [...zonesQueryData.details()],
    queryFn: async () => {
      const response = await this._zoneService.getZoneDeatils(this.id());

      this.zoneData.set(response.data);

      return response.data;
    },
  }));

  getLecturersForZone(zoneIndex: number): string[] {
    return this.selectedLecturers[zoneIndex] || [];
  }

  closeModal() {
    this.isModalOpened = false;
    // this.clearZonesArray();
  }

  updateZonesForm(): FormGroup {
    return this.fb.group({
      name: [this.zoneDeatilsQuery.data()?.name],
      region: [this.zoneDeatilsQuery.data()?.region],
      towns: this.fb.array([]),
      zoneLead: [this.zoneDeatilsQuery.data()?.zoneLead],
      lecturerIds: this.fb.array([]),
    });
  }

  get zones(): FormArray {
    return this.addZoneForm.get('zones') as FormArray;
  }

  removeZone(i: number) {
    this.zones.removeAt(i);
  }

  clearZonesArray() {
    const zonesArray = this.zones;
    while (zonesArray.length !== 0) {
      zonesArray.removeAt(0);
    }

    this.updateZonesForm();
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

  openTownList(event: any, zoneIndex: number) {
    this.currentZoneIndex = zoneIndex;
    this.isTownListOpened = true;
  }

  onRegionChange(index: number): void {
    const townsFormArray = this.getTownsFormArray(index);
    const region = this.zones.at(index).get('region') as FormArray;
    this.getTowns(region);
    townsFormArray.clear();
    this.selectedTowns[index] = [];
  }

  async getTowns(region: any) {
    const towns = await this._regionService.getTownsByRegion(region.value);
    this.towns.set(towns);
  }

  getTownsFormArray(index: number): FormArray {
    return this.zones.at(index).get('towns') as FormArray;
  }

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

  zoneMutation = injectMutation((client) => ({
    mutationFn: async ({ formData }: { formData: object }) => {
      this.isModalOpened = false;

      return await lastValueFrom(
        this._zoneService.updateZone(formData, this.id())
      );
    },
    onSuccess: (data: any) => {
      client.invalidateQueries({ queryKey: zonesQueryData.all });

      this._messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: data.message ?? 'Zone submitted successfully',
      });
      this.closeModal();
    },
    onError: (error: any) => {
      this.isModalOpened = true;

      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message ?? 'An error occurred while submitting the zone',
      });
      this.closeModal();
    },
  }));

  onSubmit() {
    const formDataArray = this.addZoneForm.get('zones')?.value;
    const formData = formDataArray[0]; 
    console.log('formData: ', formData);
    this.zoneMutation.mutate({ formData });
  }

  closeDropdown() {
    this.isTownListOpened = false;
  }
}
