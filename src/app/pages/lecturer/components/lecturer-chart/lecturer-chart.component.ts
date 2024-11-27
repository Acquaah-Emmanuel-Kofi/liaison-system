import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { NgForOf, NgIf } from '@angular/common';
import {  PieController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'liaison-lecturer-chart',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './lecturer-chart.component.html',
  styleUrl: './lecturer-chart.component.scss'
})
export class LecturerChartComponent implements AfterViewInit {
  chart!: Chart<"pie", Array<number>, unknown>;
  colors: string[] = ['#475C98', '#DDAC25', '#3d6504', 'rgba(132,138,4,0.08)', '#8a0d0d', 'rgba(66,56,35,0.08)', 'rgba(66,56,35,0.08)'];
  isToggled: boolean = false;
  headerText: string = 'Zone Supervisors Analytics';
  options: string[] = ['Faculties', 'Industries'];
  chartData: { label: string, value: number, percentage: string }[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.updateChartData('Faculties');
    this.cdr.detectChanges();
  }

  updateChartData(option: string) {
    if (option === 'Faculties') {
      this.chartData = [
        { label: "Faculty of Applied Science", value: 200, percentage: '30%' },
        { label: "Faculty of Applied Arts", value: 150, percentage: '22.5%' },
        { label: "Faculty of Building and Construction", value: 120, percentage: '18%' },
        { label: "Faculty of Engineering", value: 90, percentage: '13.5%' },
        { label: "Faculty of Business", value: 80, percentage: '12%' }
      ];
    } else if (option === 'Industry Analysis') {
      this.chartData = [
        { label: "New York", value: 100, percentage: '40%' },
        { label: "Los Angeles", value: 50, percentage: '20%' },
        { label: "Chicago", value: 30, percentage: '12%' },
        { label: "Houston", value: 20, percentage: '8%' },
        { label: "Phoenix", value: 25, percentage: '10%' },
        { label: "Philadelphia", value: 25, percentage: '10%' }
      ];
    }
    this.initializeChart();
  }

  initializeChart() {
    const ctx = document.getElementById('doughnut') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Canvas element not found! Ensure the canvas with id "doughnut" exists in the DOM.');
      return;
    }

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
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
