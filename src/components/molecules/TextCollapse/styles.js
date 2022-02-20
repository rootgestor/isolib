import styled, { css } from 'styled-components';
import DefaultButton from 'antd/lib/button';
import './styles.less';

const collapsedStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: ${(props) => props.space}px;
`;

export const TextCollapseContainer = styled.div`
  display: block;
  width: 100%;
  position: relative;
`;

export const TextCollapseInternal = styled.div`
  display: block;
  width: 100%;
  ${(props) => (props.collapsed ? collapsedStyle : '')}
  > span {
    margin-right: 10px;
  }
`;

export const Button = styled(DefaultButton)`
  ${(props) => (props.collapsed ? 'position: absolute !important;' : '')}
  right: 0;
  top: 0;
  width: auto;
  padding: 0;
  height: auto;
`;
