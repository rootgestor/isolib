/* eslint-disable no-alert */
/* eslint-disable quotes */
import React from 'react';
import Button from '../../src/components/molecules/Button';
import '../../src/styles/Button.less';

export default {
  title: 'Molecules/Button',
  component: Button,
};

function DefaultTemplate(args) {
  return <Button {...args}>Buttons</Button>;
}

export const Default = DefaultTemplate.bind({});
Default.args = {};

export const Bigger = DefaultTemplate.bind({});
Bigger.args = {
  size: 'bigger',
};

export const BiggerIcon = DefaultTemplate.bind({});
BiggerIcon.args = {
  size: 'bigger',
  icon: 'ReconciliationOutlined',
};
