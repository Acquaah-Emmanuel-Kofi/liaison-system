import { Component, input } from '@angular/core';
import { TableColumn, TableData } from './table.interface';
import { PreviewPanelComponent } from './components/preview-panel/preview-panel.component';

@Component({
  selector: 'liaison-table',
  standalone: true,
  imports: [PreviewPanelComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  columns = input.required<TableColumn[]>();
  data = input.required<TableData[]>();
}
