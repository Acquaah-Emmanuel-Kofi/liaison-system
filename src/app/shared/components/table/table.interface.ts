export interface TableColumn {
  label: string;
  key: string;
  isAction?: boolean;
}

export interface TableData {
  [key: string]: any;
}

export interface PageEvent {
  first: number | undefined;
  rows: number| undefined;
  page: number | undefined;
  pageCount: number;
}
