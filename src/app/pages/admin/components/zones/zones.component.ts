import {Component, inject, OnInit, signal} from '@angular/core';
import {ZoneHeaderComponent} from "./components/zone-header/zone-header.component";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {TableColumn, TableData} from "../../../../shared/components/table/table.interface";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {zonesQueryData} from "../../../../shared/helpers/query-keys.helper";
import {ZoneService} from "./service/zone.service";
import {SidebarService} from "../../../../shared/services/sidebar/sidebar.service";

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
export class ZonesComponent implements OnInit{
  zoneService = inject(ZoneService)
  protected sidebarService = inject(SidebarService);
  zones:any;
  selectedRowData: TableData | null = null;
  first: number | undefined = 0;
  pageSize: number = 10;
  totalData?: number;
  pageNumber = 1;
  currentYear: number = new Date().getFullYear();
  lastyear = this.currentYear - 1;
  internshipType!: boolean
  startYear = signal<number | undefined>(this.lastyear);
  endYear = signal<number | undefined>(this.currentYear);


  ngOnInit() {
    this.sidebarService.isSwitched$.subscribe((value: boolean) => {this.internshipType = value });
  }

  columns: TableColumn[] = [
    { label: 'Zone Name', key: 'name' },
    { label: 'Region', key: 'region' },
    { label: 'Zone Lead', key: 'zoneLead' },
    { label: 'No. of Lecturers', key: 'totalLecturers' },
    { label: 'Date Created', key: 'dateCreated' },
  ];

  zoneQuery = injectQuery(() => ({
    queryKey: [
      ...zonesQueryData.data(
        this.startYear() ?? this.lastyear,
        this.endYear() ?? this.currentYear,
        this.internshipType,
      ),
    ],
    queryFn: async () => {
      const response = await this.zoneService.getAllCreatedZones(
        this.startYear() ?? 0,
        this.endYear() ?? 0,
        this.internshipType
      );

      this.data = response.data;
      return response.data;
    },
  }));


  data: TableData[] = [];


  handleActionClick(row: TableData): void {
    this.selectedRowData = row;
  }


}
