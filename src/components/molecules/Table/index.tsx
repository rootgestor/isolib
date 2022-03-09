import React, { useState } from 'react';
import DefaultTable from 'antd/lib/table';
import ImportantIcon from './components/ImportantIcon';
import getRowClassName from './utils/getRowClassName';
import { TableProps, TableRecord, PrimaryTypes } from './index.d';

import './components/styles.less';

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
  const [hover, setHover] = useState(null);

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
        // rowSelection={() => {}}
        columns={[...additionalColumns, ...columns]}
        dataSource={dataSource}
        pagination={
          !hidePagination &&
          pagination && {
            ...pagination,
            showSizeChanger: true,
            position: ['bottomCenter'],
          }
        }
        onChange={onChange}
        loading={loading}
        rowKey={(record) => record._id}
        rowClassName={getRowClassName(hover)}
        onRow={(record) => ({
          onClick: handleRowClick(record),
          onMouseEnter: () => setHover(record._id),
          onMouseLeave: () => setHover(false),
        })}
      />
    </div>
  );
}
