import React from 'react';
import * as Icons from '@ant-design/icons';
export interface IconProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  style?: {};
}

function Icon({ src, alt, ...args }: IconProps) {
  const key = src as keyof typeof Icons;
  const Icon: Function = Icons[key];
  if (Icon) {
    return <Icon {...args} />;
  }

  return <img style={{ padding: '5px', ...args }} src={src} alt={alt} />;
}

export default Icon;
