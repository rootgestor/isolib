import React from 'react';
import DefaultBreadcrumb from 'antd/lib/breadcrumb';
import type { BreadcrumbProps } from './typings';

const Breadcrumb = ({ breadcrumbNameMap, onClick }: BreadcrumbProps) => {
  const urlList: string[] = Object.keys(breadcrumbNameMap);

  const handleClick =
    (url: string) =>
    (event: React.MouseEvent): boolean => {
      event.preventDefault();
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
};

export default Breadcrumb;
