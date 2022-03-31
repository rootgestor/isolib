import React from 'react';
export interface IconProps {
  src: string;
}

export function Custom({ src }: IconProps) {
  return (
    <img style={{ width: '25px', height: '25px', padding: '5px' }} src={src} />
  );
}
