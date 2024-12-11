import {Component, inject, OnInit, signal} from '@angular/core';
import {ZoneHeaderComponent} from "./components/zone-header/zone-header.component";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {TableColumn, TableData} from "../../../../shared/components/table/table.interface";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {zonesQueryData} from "../../../../shared/helpers/query-keys.helper";
import {ZoneService} from "./service/zone.service";
import {SidebarService} from "../../../../shared/services/sidebar/sidebar.service";
import {NgTemplateOutlet} from "@angular/common";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {formatDateToDDMMYYYY, searchArray} from "../../../../shared/helpers/functions.helper";
import {MessageService} from "primeng/api";
import {GlobalVariablesStore} from "../../../../shared/store/global-variables.store";

@Component({
  selector: 'liaison-zones',
  standalone: true,
  imports: [
    ZoneHeaderComponent,
    TableComponent,
    NgTemplateOutlet,
    RouterOutlet,
    ToastModule
  ],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.scss',
  providers: [MessageService]
})
export class ZonesComponent implements OnInit{
  private globalStore = inject(GlobalVariablesStore);
  activatedRoute = inject(ActivatedRoute);
  zoneService = inject(ZoneService)
  protected sidebarService = inject(SidebarService);
  zones:any;
  selectedRowData: TableData | null = null;
  first: number | undefined = 0;
  pageSize: number = 10;
  currentPage = 1
  totalData?: number;
  pageNumber = 1;
  currentYear: number = new Date().getFullYear();
  lastyear = this.currentYear - 1;
  HideCheckbox = true;
  internshipType!: boolean
  searchTerm = signal<string>('');
  FilterValue= signal<string>('');
  filteredData = signal<TableData[]>([]);
  startYear = signal<number | undefined>(this.lastyear);
  data: TableData[] = [];
  endYear = signal<number | undefined>(this.currentYear);


  ngOnInit() {
   this.internshipType =  this.sidebarService.getInternTypeState();
  }

  isChildRouteActive(): boolean {
    return this.activatedRoute.firstChild !== null;
  }

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first = data.first;

    this.currentPage = data.page + 1;

    this.pageSize = data.rows;
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
        this.globalStore.startYear(),
        this.globalStore.endYear(),
        this.globalStore.type(),
      ),
    ],
    queryFn: async () => {
      const response = await this.zoneService.getAllCreatedZones(
        this.globalStore.startYear(),
        this.globalStore.endYear(),
        this.globalStore.type(),
      );

      this.data = response.data.map((item: any) => ({
        ...item,
        dateCreated: formatDateToDDMMYYYY(item.dateCreated),
      }));
      return this.data;
    },
  }));




  handleSearchTerm(value: string) {
    this.searchTerm.set(value)
    const filteredZones = searchArray(this.zoneQuery.data()!, value, [
      'name',
      'region',
      'zoneLead'
    ]);
    this.filteredData.set(filteredZones ?? []);
  }

  handleFilter(value: string){
    this.FilterValue.set(value);
    const filteredZones = searchArray(this.zoneQuery.data()!, value, ['region'])
    this.filteredData.set(filteredZones ?? []);
}


}
