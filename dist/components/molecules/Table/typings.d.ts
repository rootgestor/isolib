import { TableProps as DefaultTableProps, TableColumnType } from 'antd';
export { TablePaginationConfig, TableColumnType } from 'antd';
export { FilterValue, SorterResult } from 'antd/lib/table/interface';
export interface TableColumnProps<T> extends Omit<TableColumnType<T>, 'render'> {
    render?: (value: string | number | boolean | Object, record: T | TableRecord<T>) => JSX.Element | string | number | boolean | T;
}
export interface TableProps<T = Record<string, any>> extends Omit<DefaultTableProps<T>, 'columns'> {
    columns: TableColumnProps<T>[];
    hidePagination?: boolean;
    onRowClick?: (record: T | TableRecord<T>) => void;
    isMessage?: boolean;
}
export interface ImportantIconProps {
    important?: boolean;
}
export interface TableRecord<T = Record<string, any>> extends ImportantIconProps, Partial<Record<string, string | number | boolean | T>> {
    _id?: string;
    subject?: string;
    text?: string;
    read?: boolean;
}
