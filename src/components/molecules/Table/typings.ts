import { TableProps as DefaultTableProps, TableColumnType } from 'antd';
import {
  FilterValue,
  SorterResult as DefaultSorterResult,
} from 'antd/lib/table/interface';

export { TablePaginationConfig, TableColumnType } from 'antd';
export { FilterValue } from 'antd/lib/table/interface';

export interface TableColumnProps extends TableColumnType<any> {
  render?: (
    value: string | number | boolean,
    record: TableRecord
  ) => JSX.Element | string | number | boolean;
}

export interface TableProps extends DefaultTableProps<any> {
  columns: TableColumnProps[];
  hidePagination?: boolean;
  onRowClick?: (record: TableRecord) => void;
  isMessage?: boolean;
}

export interface ImportantIconProps {
  important?: boolean;
}
export interface TableRecord
  extends ImportantIconProps,
    Partial<Record<string, string | number | boolean | FilterValue | null>> {
  _id?: string;
  subject?: string;
  text?: string;
  read?: boolean;
}

export interface SorterResult extends DefaultSorterResult<any> {}
