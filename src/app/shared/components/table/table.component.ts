import { Component, input, output } from '@angular/core';
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

  selectedRow: TableData | null = null;
  actionClicked = output<TableData>();

  onSelectRow(row: TableData) {
    this.selectedRow = row;
  }

  onClosePanel() {
    this.selectedRow = null;
  }

  onActionClick(row: TableData) {
    this.actionClicked.emit(row);
  }
}
