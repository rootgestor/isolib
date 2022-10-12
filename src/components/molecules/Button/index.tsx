import React from 'react';
import Icon from '../../atoms/Icon';
import DefaultButton from 'antd/lib/button';
import type { ButtonProps } from './typings';

function Button(props: ButtonProps) {
  const { icon, size, className, ...rest } = props;

  if (size === 'bigger') {
    return (
      <Button className={`isolib__bigger-button ${className}`} {...rest}>
        <div className="isolib__bigger-button-label">{props.children}</div>
        {!!icon && (
          <div className="isolib__bigger-button-icon">
            <Icon src={icon} />
          </div>
        )}
      </Button>
    );
  }

  return <DefaultButton {...props} className={className} size={size} />;
}

export default Button;
