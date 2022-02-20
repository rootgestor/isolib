import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextCollapseContainer, Button, TextCollapseInternal } from './styles';

function TextCollapse({ children, textSpace, textLess, textMore }) {
  const [collapsed, setCollapsed] = useState(true);
  const [buttonHidden, setButtonHidden] = useState(true);
  const buttonRef = useRef();
  const internalRef = useRef();
  const textRef = useRef();

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

  console.log('renderr');
  return (
    <TextCollapseContainer>
      <TextCollapseInternal
        ref={internalRef}
        collapsed={collapsed}
        space={textSpace}
      >
        <span ref={textRef}>{children}</span>
        <Button
          ref={buttonRef}
          collapsed={collapsed}
          type="link"
          onClick={handleClick}
          hidden={buttonHidden}
        >
          {collapsed ? textMore : textLess}
        </Button>
      </TextCollapseInternal>
    </TextCollapseContainer>
  );
}

TextCollapse.propTypes = {
  // text: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  textMore: PropTypes.string.isRequired,
  textLess: PropTypes.string.isRequired,
  textSpace: PropTypes.number.isRequired,
};

export default TextCollapse;
