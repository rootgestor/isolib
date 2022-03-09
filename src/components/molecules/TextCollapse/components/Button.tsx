import React from 'react';
import DefaultButton from 'antd/lib/button';
import { ButtonProps } from '../interfaces';

export const Button = ({
  children,
  collapsed,
  hidden,
  innerRef,
  onClick,
}: ButtonProps) => {
  return (
    <DefaultButton
      type="link"
      className="isolib-text-collapse-button"
      ref={innerRef}
      hidden={hidden}
      onClick={onClick}
      style={collapsed ? { position: 'absolute' } : {}}
    >
      {children}
    </DefaultButton>
  );
};
