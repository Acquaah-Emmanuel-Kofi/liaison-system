import { Component, inject, OnInit, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoaderModalComponent } from '../../../../shared/components/loader-modal/loader-modal/loader-modal.component';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { AssumptionService } from '../../services/assumption/assumption.service';
import { RegionService } from '../../../../shared/services/regions/regions.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { dashboardQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { SkeletalComponent } from './skeletal/skeletal.component';
import { CompanyDetails } from '../../../../shared/interfaces/response.interface';

@Component({
  selector: 'liaison-assumption-of-duty',
  standalone: true,
  imports: [
    StepperModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    DropdownModule,
    NgForOf,
    CheckboxModule,
    NgClass,
    NgStyle,
    ToastModule,
    LoaderModalComponent,
    SkeletalComponent,
  ],
  templateUrl: './assumption-of-duty.component.html',
  styleUrl: './assumption-of-duty.component.scss',
  providers: [MessageService],
})
export class AssumptionOfDutyComponent implements OnInit {
  dashboardService = inject(DashboardService);
  messageService = inject(MessageService);
  assumptionService = inject(AssumptionService);
  regionService = inject(RegionService);
  isFocused: boolean = false;
  isModalOpen: boolean = false;
  isAsummed: boolean = false;
  isEditMode = true;

  companyInfoForm!: FormGroup;
  AgreementForm!: FormGroup;

  zones: any;
  AssumptionOfDutyInfo: any;
  companyDetails!: CompanyDetails;

  letterToOptions = [
    { name: 'THE MANAGER', value: 'TheManager' },
    { name: 'THE CHIEF EXECUTIVE OFFICER', value: 'TheCEO' },
    { name: 'THE HUMAN RESOURCE MANAGER', value: 'TheHRManager' },
    { name: 'THE HEAD', value: 'TheHead' },
    { name: 'THE HEADMASTER', value: 'TheHeadmaster' },
    { name: 'THE MATRON', value: 'TheMatron' },
    { name: 'THE COMMANDING OFFICER', value: 'TheCommandingOfficer' },
    { name: 'THE CHIEF SUPERVISOR', value: 'TheChiefSupervisor' },
    { name: 'THE HEAD OF UNIT', value: 'TheHeadOfUnit' },
    { name: 'THE REGISTRAR', value: 'TheRegistrar' },
    {
      name: 'THE DIRECTOR (HUMAN RESOURCE DEPARTMENT)',
      value: 'TheDirectorHRDept',
    },
    { name: 'THE PROJECT ENGINEER', value: 'TheProjectEngineer' },
    { name: 'THE ADMINISTRATOR', value: 'TheAdministrator' },
    { name: 'THE SITE ENGINEER', value: 'TheSiteEngineer' },
    { name: 'THE CORDINATING DIRECTOR', value: 'TheCoordinatingDirector' },
    { name: 'THE VICE CHANCELLOR', value: 'TheViceChancellor' },
    { name: 'THE DISTRICT DIRECTOR', value: 'TheDistrictDirector' },
    { name: 'THE REGIONAL DIRECTOR', value: 'TheRegionalDirector' },
    { name: 'THE HEADMISTRESS', value: 'TheHeadmistress' },
    { name: 'THE MANAGING DIRECTOR', value: 'TheManagingDirector' },
    { name: 'THE GENERAL MANAGER', value: 'TheGeneralManager' },
    { name: 'THE DIRECTOR', value: 'TheDirector' },
    { name: 'THE ADMINISTRATIVE OFFICER', value: 'TheAdministrativeOfficer' },
    { name: 'THE FLAG OFFICER COMMANDING', value: 'TheFlagOfficerCommanding' },
    { name: 'REGIONAL COORDINATOR', value: 'RegionalCoordinator' },
    {
      name: 'THE DIRECTOR (TECHNICAL SERVICES)',
      value: 'TheDirectorTechnicalServices',
    },
    {
      name: 'THE DIRECTOR (HYDRO GENERATION)',
      value: 'TheDirectorHydroGeneration',
    },
    { name: 'THE PLANT MANAGER', value: 'ThePlantManager' },
    { name: 'THE BASE COMMANDER', value: 'TheBaseCommander' },
    { name: 'THE REGIONAL COORDINATOR', value: 'TheRegionalCoordinator' },
    { name: 'THE DIRECTOR OF PORTS', value: 'TheDirectorOfPorts' },
    { name: 'THE OFFICER-IN-CHARGE', value: 'TheOfficerInCharge' },
    { name: 'THE COMMANDING OFFICER', value: 'TheCommandingOfficer' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.zones = this.regionService.getRawRegions();
    this.buildForm();
    this.buildAgreementForm();
    this.toggleEditMode();
  }


  dashQUery = injectQuery(() => ({
    queryKey: [dashboardQueryKey.assumption],
    queryFn: async () => {
      const response = await this.dashboardService.getDashboardInfo();
      this.AssumptionOfDutyInfo = response.data.assumptionOfDuties;
      this.companyDetails = this.AssumptionOfDutyInfo[0].companyDetails;
      this.companyInfoForm.patchValue(this.companyDetails);
      this.isAsummed = response.data.isAssumeDuty;
      return response.data;
    },
  }));

  toggleEditMode(): void {

    if (this.isEditMode) {
      this.companyInfoForm.reset(this.companyDetails);

      Object.keys(this.companyInfoForm.controls).forEach((key) => {
        this.companyInfoForm.get(key)?.disable({ emitEvent: false });
      });
    } else {
      Object.keys(this.companyInfoForm.controls).forEach((key) => {
        this.companyInfoForm.get(key)?.enable({ emitEvent: false });
      });
    }

    this.isEditMode = !this.isEditMode;
  }

  buildForm() {
    this.companyInfoForm = this.fb.group({
      companyName: ['', Validators.required],
      companyPhone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      companyExactLocation: ['', Validators.required],
      companyTown: ['', Validators.required],
      dateCommenced: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companySupervisor: ['', Validators.required],
      supervisorPhone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      companyRegion: ['', Validators.required],
      letterTo: ['', Validators.required],
    });
  }

  buildAgreementForm() {
    this.AgreementForm = this.fb.group({
      termsAccepted: [false, Validators.requiredTrue], // Checkbox is required
    });
  }

  moveNext(nextCallback: any) {
    if (this.companyInfoForm.valid) {
      nextCallback.emit();
    } else {
      this.companyInfoForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Info',
        detail: 'Cannot proceed until all fields are filled.',
      });
    }
  }

  onPhoneInput($event: Event) {
    const input = $event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.companyInfoForm
      .get('phone')
      ?.setValue(input.value, { emitEvent: false });
  }

  onSuperPhoneInput($event: Event) {
    const input = $event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.companyInfoForm
      .get('supervisorPhone')
      ?.setValue(input.value, { emitEvent: false });
  }

  AssumptionMutation = injectMutation(() => ({
    mutationFn: async (formData) => {
      return await lastValueFrom(
        this.assumptionService.submitAssumptionForm(formData)
      );
    },
    onSuccess: (data: any) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail:
          data.message ?? 'Assumption of duty form submission was successfully',
      });
      this.isModalOpen = false;
    },
    onError: (error: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          error.message ?? 'An error occurred while submitting the details',
      });
      this.isModalOpen = false;
    },
  }));

  submitForm(): void {
    if (this.formIsValid()) {
      if (this.isLoactionDetailsAvailable()) {
        this.isModalOpen = true;

        this.AssumptionMutation.mutate(this.companyInfoForm.value);
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed to retrieve location from browser.',
          detail:
            'We were unable to retrieve your location. Please ensure your browser supports geolocation and try again. If the issue persists, consider switching to a different browser.',
        });
      }
    } else {
      this.AgreementForm.markAllAsTouched();
    }
  }

  updateAssumptionMutation = injectMutation(() => ({
    mutationFn: async (formData) => {
      return await lastValueFrom(
        this.assumptionService.updateAssuptionOfDuty(
          formData,
          this.AssumptionOfDutyInfo[0].id
        )
      );
    },
    onSuccess: (data: any) => {
      this.toggleEditMode();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: data.message ?? 'Assumption of duty form update was successful',
      });
      this.isModalOpen = false;
    },
    onError: (error: any) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          error.message ?? 'An error occurred while submitting the details',
      });
      this.isModalOpen = false;
    },
  }));

  updateForm() {
    this.updateAssumptionMutation.mutate(this.companyInfoForm.value);
  }

  formIsValid() {
    return this.AgreementForm.valid && this.companyInfoForm.valid;
  }

  isLoactionDetailsAvailable(): boolean {
    const { companyLatitude, companyLongitude } = this.companyInfoForm.value;
    return Boolean(
      companyLatitude &&
        companyLongitude &&
        companyLatitude !== '' &&
        companyLongitude !== ''
    );
  }

  protected readonly focus = focus;

  moveBack(prevCallback: any) {
    prevCallback.emit();
  }
}
