import { TableProps as DefaultTableProps, TableColumnType } from 'antd';
import { PrimaryTypes } from '../../../typings';
export { TablePaginationConfig, TableColumnType } from 'antd';
export { SorterResult } from 'antd/lib/table/interface';

interface TableColumnProps extends TableColumnType<any> {
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

export interface TableRecord extends ImportantIconProps {
  _id?: string;
  read?: boolean;
  [key: string]: PrimaryTypes | undefined;
}
