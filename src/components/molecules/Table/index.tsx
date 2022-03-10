import React, { useState } from 'react';
import DefaultTable from 'antd/lib/table';
import ImportantIcon from './components/ImportantIcon';
import getRowClassName from './utils/getRowClassName';
import { TableProps, TableRecord, PrimaryTypes } from './index.d';

export function Table({
  columns,
  dataSource,
  hidePagination = false,
  loading = true,
  onChange,
  onRowClick,
  pagination,
  showImportantIcon = false,
  ...rest
}: TableProps) {
  const [hover, setHover] =
    useState<React.SetStateAction<string | undefined>>('');

  const additionalColumns = [];
  if (showImportantIcon) {
    additionalColumns.push({
      dataIndex: 'important',
      key: 'important',
      width: 40,
      render: (_i: PrimaryTypes, res: TableRecord) => (
        <ImportantIcon {...res} />
      ),
    });
  }

  const handleRowClick = (record: TableRecord) => () => {
    if (onRowClick) onRowClick(record);
  };

  return (
    <div className="isolib-table">
      <DefaultTable
        size="small"
        scroll={{ y: '100%' }}
        {...rest}
        rowSelection={{ type: 'checkbox' }}
        columns={[...additionalColumns, ...columns]}
        dataSource={dataSource}
        pagination={
          !hidePagination && {
            ...pagination,
            showSizeChanger: true,
            position: ['bottomCenter'],
          }
        }
        onChange={onChange}
        loading={loading}
        rowKey={(record: { [key: string]: PrimaryTypes }) => record._id}
        rowClassName={getRowClassName(hover)}
        onRow={(record) => ({
          onClick: handleRowClick(record),
          onMouseEnter: () => setHover(record._id),
          onMouseLeave: () => setHover(''),
        })}
      />
    </div>
  );
}
