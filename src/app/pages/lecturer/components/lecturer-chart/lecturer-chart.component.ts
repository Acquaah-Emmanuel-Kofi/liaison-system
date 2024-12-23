import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { NgForOf, NgIf } from '@angular/common';
import { PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { studentAndlecturerChartQueryKey } from '../../../../shared/helpers/query-keys.helper';
import { GlobalVariablesStore } from '../../../../shared/store/global-variables.store';
import { DashboardService } from '../../services/dashboard/dashboard.service';

type ChartData = {
  label: string;
  value: number;
  percentage: string;
};

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'liaison-lecturer-chart',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './lecturer-chart.component.html',
  styleUrl: './lecturer-chart.component.scss',
})
export class LecturerChartComponent implements AfterViewInit {
  chart!: Chart<'pie', Array<number>, unknown>;
  colors: string[] = [
    '#475C98',
    '#DDAC25',
    '#3d6504',
    'rgba(132,138,4,0.08)',
    '#8a0d0d',
    'rgba(66,56,35,0.08)',
    'rgba(66,56,35,0.08)',
  ];
  isToggled: boolean = false;
  headerText: string = 'Students and Faculties';
  options: string[] = ['Faculties', 'Industries'];
  chartData = signal<ChartData[]>([]);

  private globalStore = inject(GlobalVariablesStore);
  private _dashboardService = inject(DashboardService);

  constructor(private cdr: ChangeDetectorRef) { 
    // Automatically update the chart when chartData changes
      effect(() => {
        if (this.chartData()?.length > 0) {
          this.updateChart();
        }
      });
    }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  initializeChart() {
    const ctx = document.getElementById('doughnut') as HTMLCanvasElement;
    if (!ctx) {
      console.error(
        'Canvas element not found! Ensure the canvas with id "doughnut" exists in the DOM.'
      );
      return;
    }

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
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

  chartDataQuery = injectQuery(() => ({
    queryKey: [
      ...studentAndlecturerChartQueryKey.data(
        this.globalStore.type(),
        this.globalStore.startYear(),
        this.globalStore.endYear(),
        this.globalStore.semester()
      ),
    ],
    queryFn: async () => {
      const response = await this._dashboardService.getChartData();
      const totalStudents = response.data.totalStudents;

      const data = response.data.facultyData.map((faculty) => ({
        label: faculty.name,
        value: faculty.totalStudents,
        percentage:
          ((faculty.totalStudents / totalStudents) * 100).toFixed(2) + '%',
      }));

      this.chartData.set(data);

      return response.data;
    },
  }));
}
