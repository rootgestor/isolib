import { TableProps as DefaultTableProps, TableColumnType } from 'antd';
import {
  FilterValue,
  SorterResult as DefaultSorterResult,
} from 'antd/lib/table/interface';
import { PrimaryTypes } from '../../../typings';

export { TablePaginationConfig, TableColumnType } from 'antd';
export { FilterValue } from 'antd/lib/table/interface';

export interface TableColumnProps extends TableColumnType<any> {
  render?: (
    value: PrimaryTypes,
    record: TableRecord
  ) => JSX.Element | PrimaryTypes;
}

export interface TableProps extends DefaultTableProps<any> {
  columns: TableColumnProps[];
  hidePagination?: boolean;
  onRowClick?: (record: TableRecord) => void;
  showImportantIcon?: boolean;
}

export interface ImportantIconProps {
  important?: boolean;
}
export interface TableRecord
  extends ImportantIconProps,
    Partial<Record<string, PrimaryTypes | FilterValue | null>> {
  _id?: string;
  subject?: string;
  text?: string;
  read?: boolean;
}

export interface SorterResult extends DefaultSorterResult<any> {}
