import { TableProps as DefaultTableProps, TableColumnType } from 'antd';
import { JSONType, PrimaryTypes } from '../../../types';
export { TablePaginationConfig } from 'antd';
export { SorterResult } from 'antd/lib/table/interface';
export { PrimaryTypes } from '../../../types';

interface TableColumnProps extends TableColumnType<any> {
  render?: (
    value: PrimaryTypes,
    record: JSONType
  ) => JSX.Element | PrimaryTypes;
}

export interface TableProps extends DefaultTableProps<any> {
  columns: TableColumnProps[];
  hidePagination?: boolean;
  onRowClick?: (record: JSONType) => void;
  showImportantIcon?: boolean;
}

export interface ImportantIconProps {
  important?: boolean;
}

export interface TableRecord extends ImportantIconProps {
  _id?: string;
  read?: boolean;
  [key: string]: PrimaryTypes;
}
