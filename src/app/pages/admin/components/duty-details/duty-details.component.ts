import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { studentAssumptionOfDutyLogsQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'liaison-duty-details',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe],
  templateUrl: './duty-details.component.html',
  styleUrl: './duty-details.component.scss',
})
export class DutyDetailsComponent {
  id = input.required<string>();

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
}
