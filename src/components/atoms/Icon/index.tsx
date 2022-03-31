import React from 'react';
import * as Icons from '@ant-design/icons';
export interface IconProps {
  src: string;
}

function Icon({ src, ...args }: IconProps) {
  const key = src as keyof typeof Icons;
  const Icon: any = Icons[key];
  if (Icon) {
    return <Icon {...args} />;
  }
  return (
    <img style={{ width: '25px', height: '25px', padding: '5px' }} src={src} />
  );
}

export default Icon;
