export interface TableColumn {
  label: string;
  key: string;
  isAction?: boolean;
}

export interface TableData {
  [key: string]: any;
}
