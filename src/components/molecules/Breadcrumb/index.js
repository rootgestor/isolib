import React from 'react';
import PropTypes from 'prop-types';
import DefaultBreadcrumb from 'antd/lib/breadcrumb';
import './styles.less';

function Breadcrumb({ breadcrumbNameMap, onClick }) {
  const urlList = Object.keys(breadcrumbNameMap);

  const handleClick = (url) => (e) => {
    e.preventDefault();
    onClick(url);
    return false;
  };

  return (
    <DefaultBreadcrumb style={{ margin: '16px 0' }}>
      {urlList.map((url) => (
        <DefaultBreadcrumb.Item key={url} href="#" onClick={handleClick(url)}>
          {breadcrumbNameMap[url]}
        </DefaultBreadcrumb.Item>
      ))}
    </DefaultBreadcrumb>
  );
}

Breadcrumb.propTypes = {
  breadcrumbNameMap: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func,
};

Breadcrumb.defaultProps = {
  onClick: null,
};

export default Breadcrumb;
