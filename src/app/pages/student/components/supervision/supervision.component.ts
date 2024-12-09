import {Component, inject, signal} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {CardModule} from "primeng/card";
import {TableComponent} from "../../../../shared/components/table/table.component";
import {TableColumn, TableData} from "../../../../shared/components/table/table.interface";
import {searchArray} from "../../../../shared/helpers/functions.helper";
import {ColleagueHeaderComponent} from "./components/colleague-header/colleague-header.component";
import {injectQuery} from "@tanstack/angular-query-experimental";
import {dashboardQueryKey} from "../../../../shared/helpers/query-keys.helper";
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {IColleagueData} from "../../../../shared/interfaces/response.interface";

@Component({
  selector: 'liaison-supervision',
  standalone: true,
  imports: [
    CardModule,
    TableComponent,
    ColleagueHeaderComponent,
    NgTemplateOutlet,
    RouterOutlet
  ],
  templateUrl: './supervision.component.html',
  styleUrl: './supervision.component.scss'
})
export class SupervisionComponent {
  dashboardService = inject(DashboardService);
  activatedRoute = inject(ActivatedRoute);

  first = signal<number>(0);
  totalData = signal<number>(10);
  pageSize = signal<number>(10);
  currentPage = signal<number>(1);
  searchTerm = signal<string>('');
  filteredData = signal<TableData[]>([]);

  HideCheckbox = true;


  columns: TableColumn[] = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    {label: 'Department', key: 'department' },
  ];

  students: any = [];

  handlePageChange(data: { first: number; rows: number; page: number }) {
    this.first.set(data.first);
    this.currentPage.set(data.page + 1);
    this.pageSize.set(data.rows);
  }


  handleSearchTerm(value: string) {
    this.searchTerm.set(value);

    const filteredLecturers = searchArray(this.dashboardDataQuery.data()!, value, [
      'name',
      'email',
      'department'
    ]);

    this.filteredData.set(filteredLecturers ?? []);
  }

  dashboardDataQuery = injectQuery(()=> ({
      queryKey: [dashboardQueryKey.colleagues],
      queryFn: async ()=>{
        const response = await this.dashboardService.getDashboardInfo()
       this.students = response.data.colleagues;

        return  this.destructureStudents(this.students);
      }
    })

  );

  isChildRouteActive(): boolean {
    return this.activatedRoute.firstChild !== null;
  }

  destructureStudents(data: IColleagueData[]): TableData[] {
    if (!data) return [];
    return data.map((student: IColleagueData) => ({
      name: student.name,
      email: student.email,
      department:student.department
    }));
  }





}
