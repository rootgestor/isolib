import React from 'react';
import { BellOutlined, BellFilled } from '@ant-design/icons';
import { ImportantIconProps } from '../index.d';

function ImportantIcon({ important }: ImportantIconProps) {
  const namespace = 'isolib-table isolib-table-icon';

  if (important) {
    return <BellFilled className={`${namespace}--selected`} />;
  }
  return <BellOutlined className={`${namespace}--no-selected`} />;
}

export default ImportantIcon;
