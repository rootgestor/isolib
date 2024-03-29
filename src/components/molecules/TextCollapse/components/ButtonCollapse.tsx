import React from 'react';
import DefaultButton from 'antd/lib/button';
import type { ButtonCollapseProps } from '../typings';

export const ButtonCollapse = ({
  children,
  collapsed,
  hidden,
  innerRef,
  space,
  onClick,
}: ButtonCollapseProps) => {
  return (
    <DefaultButton
      type="link"
      className="isolib-text-collapse-button"
      ref={innerRef}
      hidden={hidden}
      onClick={onClick}
      style={collapsed ? { position: 'absolute', right: `-${space}px` } : {}}
    >
      {children}
    </DefaultButton>
  );
};
