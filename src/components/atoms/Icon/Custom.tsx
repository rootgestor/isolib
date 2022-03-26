import React from 'react';
export interface IconProps {
  src: string;
}

export function Custom({ src }: IconProps) {
  return <img className="isolib-custom-icon" src={src} />;
}
