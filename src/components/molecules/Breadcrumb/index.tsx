import React from 'react';
import DefaultBreadcrumb from 'antd/lib/breadcrumb';
import type { BreadcrumbProps } from './typings';

const Breadcrumb = ({ breadcrumbNameMap, onClick }: BreadcrumbProps) => {
  const handleClick =
    (url?: string) =>
    (event: React.MouseEvent): boolean => {
      event.preventDefault();
      if (url) onClick(url);
      return false;
    };

  return (
    <DefaultBreadcrumb style={{ margin: '16px 0' }}>
      {breadcrumbNameMap.map(({ label, href }) => (
        <DefaultBreadcrumb.Item key={href} href="#" onClick={handleClick(href)}>
          {label}
        </DefaultBreadcrumb.Item>
      ))}
    </DefaultBreadcrumb>
  );
};

export default Breadcrumb;
