import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { studentAssumptionOfDutyLogsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { CommonModule } from '@angular/common';
import { DutyData } from '../../../../shared/interfaces/response.interface';
import { formatDateToDDMMYYYY } from '../../../../shared/helpers/functions.helper';

@Component({
  selector: 'liaison-duty-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './duty-details.component.html',
  styleUrl: './duty-details.component.scss',
})
export class DutyDetailsComponent {
  id = input.required<string>();
  numberOfSkeletons: number[] = new Array<number>(7);

  private _dashboardService = inject(DashboardService);

  dutyDetailsQuery = injectQuery(() => ({
    queryKey: [...studentAssumptionOfDutyLogsQueryKey.details()],
    queryFn: async () => {
      const response =
        await this._dashboardService.getUpdatedAssumptionOfDutyDetails(
          this.id()
        );

      const data = {
        oldDuty: response.data.oldAssumptionOfDuties[0],
        updatedDuty: response.data.updatedAssumptionOfDuty,
      };

      return data;
    },
  }));

  get oldDutyKeys() {
    const oldDuty = this.dutyDetailsQuery.data()?.oldDuty;
    return oldDuty ? this.prepareDutyKeys(oldDuty) : [];
  }

  get updatedDutyKeys() {
    const updatedDuty = this.dutyDetailsQuery.data()?.updatedDuty;
    return updatedDuty ? this.prepareDutyKeys(updatedDuty) : [];
  }

  prepareDutyKeys(duty: DutyData) {
    return [
      { label: 'Student ID', value: this.id() ?? 'N/A' },
      {
        label: 'Date Created',
        value: formatDateToDDMMYYYY(duty?.dateCreated) ?? 'N/A',
      },
      {
        label: 'Date Updated',
        value: formatDateToDDMMYYYY(duty?.dateUpdated) ?? 'N/A',
      },
      {
        label: 'Date Commenced',
        value: formatDateToDDMMYYYY(duty?.dateCommenced) ?? 'N/A',
      },
      {
        label: 'Academic Year',
        value: this.formatAcademicYear(
          duty?.startOfAcademicYear,
          duty?.endOfAcademicYear
        ),
      },

      {
        label: 'Company Name',
        value: duty?.companyDetails?.companyName ?? 'N/A',
      },
      {
        label: 'Company Address',
        value: duty?.companyDetails?.companyAddress ?? 'N/A',
      },
      {
        label: 'Company Email',
        value: duty?.companyDetails?.companyEmail ?? 'N/A',
      },
      {
        label: 'Company Phone',
        value: duty?.companyDetails?.companyPhone ?? 'N/A',
      },
      { label: 'Region', value: duty?.companyDetails?.companyRegion ?? 'N/A' },
      {
        label: 'Supervisor',
        value: duty?.companyDetails?.companySupervisor ?? 'N/A',
      },
      { label: 'Internship', value: duty?.internship ? 'Yes' : 'No' },
    ];
  }

  isEqual(key: any) {
    const oldValue = this.oldDutyKeys.find(
      (oldKey) => oldKey.label === key.label
    )?.value;
    return oldValue === key.value;
  }

  formatAcademicYear(startDate: string, endDate: string): string {
    const startYear = startDate ? new Date(startDate).getFullYear() : 'N/A';
    const endYear = endDate ? new Date(endDate).getFullYear() : 'N/A';
    return `${startYear} / ${endYear}`;
  }
}
