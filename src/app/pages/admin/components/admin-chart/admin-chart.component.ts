import {
  Component,
  inject,
  signal,
  effect,
  AfterViewInit,
} from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Chart, ChartConfiguration } from 'chart.js';
import { registerables } from 'chart.js';
import { DashboardService } from '../../service/dashboard/dashboard.service';
import { studentAndlecturerChartQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { NameValue } from '../../../../shared/interfaces/constants.interface';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
Chart.register(...registerables);

type ChartData = {
  label: string;
  value: number;
  percentage: string;
};

type RoleAnalytics = 'studentAnalytics' | 'lecturerAnalytics';

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
  options: NameValue[] = [
    {
      name: 'Student Analytics',
      value: 'studentAnalytics',
    },
    {
      name: 'Lecture Analytics',
      value: 'lecturerAnalytics',
    },
  ];

  optionSelected = signal<RoleAnalytics>('studentAnalytics');
  chartData = signal<ChartData[]>([]);

  private _dashboardService = inject(DashboardService);
  private globalStore = inject(GlobalVariablesStore);

  // Automatically update the chart when chartData changes
  constructor() {
    effect(() => {
      if (this.chartData()?.length > 0) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit(): void {
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

  updateChart() {
    if (this.chart) {
      // Update chart labels and data
      this.chart.data.labels = this.chartData().map((item) => item.label);
      this.chart.data.datasets[0].data = this.chartData().map(
        (item) => item.value
      );
      this.chart.update(); // Re-render the chart with updated data
    } else {
      // Initialize the chart if it doesn't exist
      this.initializeChart();
    }
  }

  onOptionSelected(option: NameValue) {
    this.headerText = option.name;
    this.isToggled = false;
    this.optionSelected.set(option.value as RoleAnalytics);

    this.studentAndlecturerChartQuery.refetch();
  }

  studentAndlecturerChartQuery = injectQuery(() => ({
    queryKey: [
      ...studentAndlecturerChartQueryKey.data(
        this.globalStore.type(),
        this.globalStore.startYear(),
        this.globalStore.endYear(),
        this.globalStore.semester()
      ),
    ],
    queryFn: async () => {
      const response = await this._dashboardService.getAssignedAndUnassigned();
      const isStudentAnalytics = this.optionSelected() === 'studentAnalytics';

      if (isStudentAnalytics) {
        const assignedStudents =
          response.data.assignedAndUnassignedStudents.assignedStudents.count;
        const unassignedStudents =
          response.data.assignedAndUnassignedStudents.unassignedStudents.count;
        const totalStudents = assignedStudents + unassignedStudents;

        this.chartData.set([
          {
            label: 'Assigned Students',
            value: assignedStudents,
            percentage: `${((assignedStudents / totalStudents) * 100).toFixed(
              2
            )}%`,
          },
          {
            label: 'Unassigned Students',
            value: unassignedStudents,
            percentage: `${((unassignedStudents / totalStudents) * 100).toFixed(
              2
            )}%`,
          },
        ]);
      } else {
        const assignedLecturers =
          response.data.assignedAndUnassignedLecturers.assignedLecturers.count;
        const unassignedLecturers =
          response.data.assignedAndUnassignedLecturers.unassignedLecturers
            .count;
        const totalLecturers = assignedLecturers + unassignedLecturers;

        this.chartData.set([
          {
            label: 'Assigned Supervisors',
            value: assignedLecturers,
            percentage: `${((assignedLecturers / totalLecturers) * 100).toFixed(
              2
            )}%`,
          },
          {
            label: 'Unassigned Supervisors',
            value: unassignedLecturers,
            percentage: `${(
              (unassignedLecturers / totalLecturers) *
              100
            ).toFixed(2)}%`,
          },
        ]);
      }
      return response.data;
    },
  }));
}
