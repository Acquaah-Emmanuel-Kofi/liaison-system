import {Component, EventEmitter, Input, input, OnInit, Output, output} from '@angular/core';
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
  @Input() totalData:number | undefined = 0;
  selectedRow: TableData | null = null;
  actionClicked = output<TableData>();
  @Output() pageChange = new EventEmitter<{ first: number; rows: number; page: number }>();


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



  onPageChange(event: any) {
    this.pageChange.emit(event);
  }

  onActionClick(row: TableData) {
    this.actionClicked.emit(row);
  }
}
