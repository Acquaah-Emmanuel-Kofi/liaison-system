import { Component, Input, input, OnInit, output } from '@angular/core';
import {PageEvent, TableColumn, TableData} from './table.interface';
import { PreviewPanelComponent } from './components/preview-panel/preview-panel.component';
import { CommonModule, NgClass } from '@angular/common';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { getFirstTwoInitials, sortByKey } from '../../helpers/functions.helper';
import {PaginatorModule, PaginatorState} from "primeng/paginator";

@Component({
  selector: 'liaison-table',
  standalone: true,
  imports: [PreviewPanelComponent, NgClass, CommonModule, StatusChipComponent, PaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() HideCheckbox!: boolean;
  @Input() HidePagination!: boolean
  columns = input.required<TableColumn[]>();
  data = input.required<TableData[]>();

  @Input() first: number | undefined  = 0;
  @Input() pageSize: number | undefined = 0;
  @Input() totalData = 0;
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
    this.actionClicked.emit(row);
  }


  onClosePanel() {
    this.selectedRow = null;
  }



  onPageChange(event: PaginatorState) {
    this.first = event.first;
    this.pageSize = event.rows;
  }

  onActionClick(row: TableData) {
    this.actionClicked.emit(row);
  }
}
