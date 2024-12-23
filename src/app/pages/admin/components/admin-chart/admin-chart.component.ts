import {
  Component,
  AfterViewInit,
  inject,
  signal,
  effect,
} from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Chart, ChartConfiguration } from 'chart.js';
import { registerables } from 'chart.js';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { lecturerChartQueryKey, studentChartQueryKey } from '../../../../shared/helpers/query-keys.helper';
Chart.register(...registerables);

type ChartData = {
  label: string;
  value: number;
  percentage: string;
};

@Component({
  selector: 'liaison-admin-chart',
  standalone: true,
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.scss'],
})
export class AdminChartComponent implements AfterViewInit {
  chart!: Chart<'doughnut', Array<number>, unknown>;
  colors: string[] = ['#475C98', '#DDAC25', '#CBC7BD14'];
  isToggled: boolean = false;
  headerText: string = 'Student Analytics';
  options: string[] = ['Student Analytics', 'Lecture Analytics'];
  chartData = signal<ChartData[]>([]);

  private _dashboardService = inject(DashboardService);

  studentChartData = signal<ChartData[]>([]);
  lecturerChartData = signal<ChartData[]>([]);

  constructor() {
    effect(
      () => {
        this.studentChartData();
        this.lecturerChartData();

        this.updateChartData('Student Analytics');
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  ngAfterViewInit() {
    this.updateChartData('Student Analytics');
  }

  updateChartData(option: string) {
    if (option === 'Student Analytics') {
      this.chartData.set([
        {
          label: 'Assigned Students',
          value: this.studentChartQuery.data()?.assignedStudents.count!,
          percentage: `${
            this.studentChartQuery.data()?.assignedStudents.count! / 100 ||
            '---'
          }%`,
        },
        {
          label: 'Unassigned Students',
          value: this.studentChartQuery.data()?.unassignedStudents.count!,
          percentage: `${
            this.studentChartQuery.data()?.unassignedStudents.count! / 100 ||
            '---'
          }%`,
        },
      ]);
    } else if (option === 'Lecture Analytics') {
      this.chartData.set([
        {
          label: 'Assigned Students',
          value: this.lecturerChartQuery.data()?.assignedStudents.count!,
          percentage: `${
            this.lecturerChartQuery.data()?.assignedStudents.count! / 100 ||
            '---'
          }%`,
        },
        {
          label: 'Unassigned Students',
          value: this.lecturerChartQuery.data()?.unassignedStudents.count!,
          percentage: `${
            this.lecturerChartQuery.data()?.unassignedStudents.count! / 100 ||
            '---'
          }%`,
        },
      ]);
    }

    this.initializeChart();
  }

  initializeChart() {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found!');
      return;
    }
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: this.chartData()?.map((item) => item.label),
        datasets: [
          {
            backgroundColor: this.colors,
            data: this.chartData()?.map((item) => item.value),
            borderWidth: 1,
            borderColor: '#ffffff',
            hoverBorderColor: '#ffffff',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    };
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(ctx, config);
  }

  onOptionSelected(option: string) {
    this.headerText = option;
    this.isToggled = false;
    this.updateChartData(option);
  }

  studentChartQuery = injectQuery(() => ({
    queryKey: [...studentChartQueryKey.data()],
    queryFn: async () => {
      const response =
        await this._dashboardService.getAssignedAndUnassignedStudents();

      const data = [
        {
          label: 'Assigned Students',
          value: response.data.assignedStudents.count,
          percentage: `${response.data.assignedStudents.count / 100}%`,
        },
        {
          label: 'Unassigned Students',
          value: response.data.unassignedStudents.count,
          percentage: `${response.data.unassignedStudents.count / 100}%`,
        },
      ];

      this.studentChartData.set(data);

      return response.data;
    },
  }));

  lecturerChartQuery = injectQuery(() => ({
    queryKey: [...lecturerChartQueryKey.data()],
    queryFn: async () => {
      const response =
        await this._dashboardService.getAssignedAndUnassignedLecturers();

      const data = [
        {
          label: 'Assigned Students',
          value: response.data.assignedStudents.count,
          percentage: `${response.data.assignedStudents.count / 100}%`,
        },
        {
          label: 'Unassigned Students',
          value: response.data.unassignedStudents.count,
          percentage: `${response.data.unassignedStudents.count / 100}%`,
        },
      ];

      this.lecturerChartData.set(data);

      return response.data;
    },
  }));
}
