import React from 'react';
import type { ContainerProps } from '../typings';

export const Container = ({ children, style = {} }: ContainerProps) => {
  return (
    <div
      className="isolib-text-collapse isolib-text-collapse-container"
      style={style}
    >
      {children}
    </div>
  );
};
