/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Internal } from './components';
import { TextCollapseProps } from './interfaces.d';
import './components/styles.less';

export function TextCollapse({
  children,
  textSpace,
  textLess,
  textMore,
  style,
}: TextCollapseProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [buttonHidden, setButtonHidden] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>();
  const internalRef = useRef<HTMLDivElement>();
  const textRef = useRef<HTMLElement>();

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (internalRef.current && textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const innerWidth = internalRef.current.offsetWidth;
      setButtonHidden(textWidth + textSpace < innerWidth);
    }
  }, []);

  return (
    <Container style={style}>
      <Internal collapsed={collapsed} innerRef={internalRef} space={textSpace}>
        <span ref={textRef}>{children}</span>
        <Button
          innerRef={buttonRef}
          collapsed={collapsed}
          onClick={handleClick}
          hidden={buttonHidden}
        >
          {collapsed ? textMore : textLess}
        </Button>
      </Internal>
    </Container>
  );
}
