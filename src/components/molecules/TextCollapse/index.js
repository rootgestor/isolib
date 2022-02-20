import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextCollapseContainer, Button, TextCollapseInternal } from './styles';

function TextCollapse({ text, textSpace, textButton }) {
  const [collapsed, setCollapsed] = useState(true);

  const handleClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <TextCollapseContainer>
      <TextCollapseInternal collapsed={collapsed} space={textSpace}>
        {text}
      </TextCollapseInternal>
      <Button collapsed={collapsed} type="link" onClick={handleClick}>
        {textButton}
      </Button>
    </TextCollapseContainer>
  );
}

TextCollapse.propTypes = {
  text: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  textButton: PropTypes.string.isRequired,
  textSpace: PropTypes.number.isRequired,
};

export default TextCollapse;
