import React, { useState, useRef, useEffect } from 'react';
import { Container, ButtonCollapse, Internal } from './components';
import type { TextCollapseProps } from './typings';

function TextCollapse({
  children,
  textSpace,
  textLess,
  textMore,
  style = {},
}: TextCollapseProps) {
  const [collapsed, setCollapsed] = useState(true);
  const [buttonHidden, setButtonHidden] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const internalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (internalRef.current && textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const innerWidth = internalRef.current.offsetWidth;
      const bHidden = !!(textWidth + textSpace < innerWidth);
      setButtonHidden(bHidden);
    }
  }, [textSpace]);

  return (
    <Container style={style}>
      <Internal collapsed={collapsed} innerRef={internalRef} space={textSpace}>
        <span ref={textRef}>{children}</span>
        <ButtonCollapse
          innerRef={buttonRef}
          collapsed={collapsed}
          onClick={handleClick}
          hidden={buttonHidden}
        >
          {collapsed ? textMore : textLess}
        </ButtonCollapse>
      </Internal>
    </Container>
  );
}

export default TextCollapse;
