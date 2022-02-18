import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DefaultTable from 'antd/lib/table';
import ImportantIcon from './components/ImportantIcon';
import getRowClassName from './utils/getRowClassName';
import './styles.less';

function Table({
  columns,
  dataSource,
  paginate,
  onChange,
  loading,
  onRowClick,
  showImportantIcon,
  hidePagination,
  ...rest
}) {
  const [hover, setHover] = useState(null);

  const additionalColumns = [];
  if (showImportantIcon) {
    additionalColumns.push({
      dataIndex: 'important',
      key: 'important',
      width: 40,
      render: (_i, res) => <ImportantIcon {...res} />,
    });
  }

  const handleRowClick = (record) => () => {
    if (onRowClick) onRowClick(record);
  };

  return (
    <div className="isolib-table">
      <DefaultTable
        size="small"
        scroll={{ y: '100%' }}
        {...rest}
        rowSelection={() => {}}
        columns={[...additionalColumns, ...columns]}
        dataSource={dataSource}
        pagination={
          !hidePagination && {
            ...paginate,
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

Table.propTypes = {
  loading: PropTypes.bool,
  showImportantIcon: PropTypes.bool,
  hidePagination: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dataSource: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  paginate: PropTypes.shape({}),
  onChange: PropTypes.func,
  onRowClick: PropTypes.func,
};

Table.defaultProps = {
  paginate: false,
  onChange: () => {},
  onRowClick: () => {},
  showImportantIcon: false,
  hidePagination: false,
  loading: true,
};

export default Table;
