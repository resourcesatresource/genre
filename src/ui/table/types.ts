export interface TableData {
  labels: string[];
  values: string[][];
}

export interface TableProps {
  data: TableData;
  listingLabel?: string;
  emptyStateTitle?: string;
  onValueClick?: (id: number, value: string[]) => void;
}
