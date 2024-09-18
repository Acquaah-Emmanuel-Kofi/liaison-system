import {Component, inject} from '@angular/core';
import {ZoneHeaderComponent} from "./components/zone-header/zone-header.component";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {TableColumn, TableData} from "../../../../shared/components/table/table.interface";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {studentsQueryKey} from "../../../../shared/helpers/query-keys.helper";
import {ZoneService} from "./service/zone.service";

@Component({
  selector: 'liaison-zones',
  standalone: true,
  imports: [
    ZoneHeaderComponent,
    TableComponent
  ],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.scss'
})
export class ZonesComponent {

  selectedRowData: TableData | null = null;
  first: number | undefined = 0;
  pageSize: number = 10;
  totalData?: number;
  pageNumber = 1;


  columns: TableColumn[] = [
    { label: 'Zone Name', key: 'zone_name' },
    { label: 'Region', key: 'region' },
    { label: 'Zone Lead', key: 'zone_lead' },
    { label: 'No. of Lecturers', key: 'no_of_lecturers' },
    { label: 'Date Created', key: 'date_created' },
  ];



  data: TableData[] = [];

  handleActionClick(row: TableData): void {
    this.selectedRowData = row;
  }


}
