import { Component, AfterViewInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'liaison-admin-chart',
  standalone: true,
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.scss']
})
export class AdminChartComponent implements AfterViewInit {
  chart!: Chart<"doughnut", Array<number>, unknown>;
  colors: string[] = ['#475C98', '#DDAC25', '#CBC7BD14'];
  isToggled: boolean = false;
  headerText: string = 'Student Analytics';
  options: string[] = ['Student Analytics', 'Lecture Analytics'];
  chartData: { label: string, value: number, percentage: string }[] = [];

  ngAfterViewInit() {
    this.updateChartData('Student Analytics');
  }

  updateChartData(option: string) {
    if (option === 'Student Analytics') {
      this.chartData = [
        { label: "Assigned Students", value: 60, percentage: '60%' },
        { label: "Unassigned Students", value: 40, percentage: '40%' }
      ];
    } else if (option === 'Lecture Analytics') {
      this.chartData = [
        { label: "Assigned Lectures", value: 80, percentage: '80%' },
        { label: "Unassigned Lectures", value: 20, percentage: '20%' }
      ];
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
        labels: this.chartData.map(item => item.label),
        datasets: [
          {
            backgroundColor: this.colors,
            data: this.chartData.map(item => item.value),
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
}
