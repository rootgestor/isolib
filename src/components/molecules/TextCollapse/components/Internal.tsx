import React from 'react';
import classNames from 'classnames';
import { InternalProps } from '../index.d';

export const Internal = ({
  innerRef,
  collapsed,
  space,
  children,
}: InternalProps) => {
  return (
    <div
      ref={innerRef}
      style={collapsed && space ? { paddingRight: space } : {}}
      className={classNames('isolib-text-collapse-internal', {
        'isolib-text-collapse-internal--collapsed': collapsed,
      })}
    >
      {children}
    </div>
  );
};
