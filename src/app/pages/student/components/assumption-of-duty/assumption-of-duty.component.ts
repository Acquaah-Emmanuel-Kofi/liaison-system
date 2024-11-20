import {Component, inject, OnInit} from '@angular/core';
import {StepperModule} from "primeng/stepper";
import {Button} from "primeng/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {LoaderModalComponent} from "../../../../shared/components/loader-modal/loader-modal/loader-modal.component";

@Component({
  selector: 'liaison-assumption-of-duty',
  standalone: true,
  imports: [
    StepperModule,
    Button,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    DropdownModule,
    NgForOf,
    CheckboxModule,
    NgClass,
    NgStyle,
    ToastModule,
    LoaderModalComponent
  ],
  templateUrl: './assumption-of-duty.component.html',
  styleUrl: './assumption-of-duty.component.scss',
  providers: [MessageService]
})
export class AssumptionOfDutyComponent implements OnInit {
  messageService = inject(MessageService)
  isFocused: boolean = false;
  isModalOpen: boolean = false;

  companyInfoForm!: FormGroup;
  AgreementForm!: FormGroup

  zones = [
    { name: 'Western Region (Takoradi Township)', value: 'WesternRegion' },
    { name: 'Central Region (Cape Coast)', value: 'CentralRegion' },
    { name: 'Greater Accra Region (Accra)', value: 'GreaterAccra' },
    { name: 'Ashanti Region (Kumasi)', value: 'AshantiRegion' },
  ];

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
    { name: 'THE DIRECTOR (HUMAN RESOURCE DEPARTMENT)', value: 'TheDirectorHRDept' },
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
    { name: 'THE DIRECTOR (TECHNICAL SERVICES)', value: 'TheDirectorTechnicalServices' },
    { name: 'THE DIRECTOR (HYDRO GENERATION)', value: 'TheDirectorHydroGeneration' },
    { name: 'THE PLANT MANAGER', value: 'ThePlantManager' },
    { name: 'THE BASE COMMANDER', value: 'TheBaseCommander' },
    { name: 'THE REGIONAL COORDINATOR', value: 'TheRegionalCoordinator' },
    { name: 'THE DIRECTOR OF PORTS', value: 'TheDirectorOfPorts' },
    { name: 'THE OFFICER-IN-CHARGE', value: 'TheOfficerInCharge' },
    { name: 'THE COMMANDING OFFICER', value: 'TheCommandingOfficer' }
  ];


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm()
    this.buildAgreementForm()
  }


  buildForm(){
    this.companyInfoForm = this.fb.group({
      companyName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      location: ['', Validators.required],
      city: ['', Validators.required],
      commencementDate: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      supervisor: ['', Validators.required],
      supervisorPhone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      companyZone: ['', Validators.required],
      letterTo: ['', Validators.required],
    });
  }

  buildAgreementForm(){
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
        detail:  'cannot proceed until all fields are filled'
      });
    }
  }

  onPhoneInput($event: Event) {
    const input = $event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.companyInfoForm.get('phone')?.setValue(input.value, { emitEvent: false })
  }
  onSuperPhoneInput($event: Event) {
    const input = $event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.companyInfoForm.get('supervisorPhone')?.setValue(input.value, { emitEvent: false })

  }


  submitForm(): void {
    if (this.AgreementForm.valid && this.companyInfoForm.valid) {
      this.isModalOpen = true;
      console.log('Form Data:', this.companyInfoForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail:  'Assumption of duty form submission was successfully'
      });
      this.isModalOpen = false;
    } else {
      this.AgreementForm.markAllAsTouched();
    }
  }


  protected readonly focus = focus;

  moveBack(prevCallback: any) {
    prevCallback.emit();
  }


}
