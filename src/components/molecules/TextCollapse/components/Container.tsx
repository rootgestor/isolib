import React from 'react';
import { ContainerProps } from '../interfaces';

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
