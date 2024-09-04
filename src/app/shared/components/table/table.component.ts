import { Component, Input, input, OnInit, output } from '@angular/core';
import { TableColumn, TableData } from './table.interface';
import { PreviewPanelComponent } from './components/preview-panel/preview-panel.component';
import { CommonModule, NgClass } from '@angular/common';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { getFirstTwoInitials, sortByKey } from '../../helpers/constants.helper';

@Component({
  selector: 'liaison-table',
  standalone: true,
  imports: [PreviewPanelComponent, NgClass, CommonModule, StatusChipComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() HideCheckbox!: boolean;
  columns = input.required<TableColumn[]>();
  data = input.required<TableData[]>();

  selectedRow: TableData | null = null;
  actionClicked = output<TableData>();

  sortOrder: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.sortByName();
  }

  sortByName(): void {
    sortByKey(this.data(), 'name', this.sortOrder);
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

  getNameInitials(name: string) {
    return getFirstTwoInitials(name);
  }

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
