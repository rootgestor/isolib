import React from 'react';
import PropTypes from 'prop-types';
import { BellOutlined, BellFilled } from '@ant-design/icons';

function ImportantIcon({ important }) {
  const namespace = 'isolib-table isolib-table-icon';

  if (important) {
    return <BellFilled className={`${namespace}--selected`} />;
  }
  return <BellOutlined className={`${namespace}--no-selected`} />;
}

ImportantIcon.propTypes = {
  important: PropTypes.bool,
};

ImportantIcon.defaultProps = {
  important: false,
};

export default ImportantIcon;
