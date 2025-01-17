import { Component, inject, signal } from '@angular/core';
import {
  TableColumn,
  TableData,
} from '../../../../shared/components/table/table.interface';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { topIndustriesQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from '../../../../shared/components/searchbar/searchbar.component';
import { searchArray } from '../../../../shared/helpers/functions.helper';

@Component({
  selector: 'liaison-industries',
  standalone: true,
  imports: [TableComponent, CommonModule, SearchbarComponent],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.scss',
})
export class IndustriesComponent {
  searchTerm = signal<string>('');
  currentPage = signal<number>(1);
  first = signal<number>(0);
  totalData = signal<number>(10);
  pageSize = signal<number>(10);
  filteredData = signal<TableData[]>([]);

  topIndustriescolumns: TableColumn[] = [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Location',
      key: 'exactLocation',
    },
    {
      label: 'Email',
      key: 'email',
    },
    {
      label: 'Phone',
      key: 'phone',
    },
    {
      label: 'Region',
      key: 'region',
    },
  ];

  private _dashboardService = inject(DashboardService);

  industriesQuery = injectQuery(() => ({
    queryKey: [...topIndustriesQueryKey.all],
    queryFn: async () => {
      const response = await this._dashboardService.getStatAnalytics();

      return response.data.company.companyDetails;
    },
  }));

  handleSearchTerm(value: string) {
    this.searchTerm.set(value);

    const filteredStudents = searchArray(this.industriesQuery.data()!, value, [
      'name',
      'exactLocation',
      'region',
    ]);

    this.filteredData.set(filteredStudents ?? []);
  }

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first.set(data.first);
    this.currentPage.set(data.page + 1);
    this.pageSize.set(data.rows);
  }
}
