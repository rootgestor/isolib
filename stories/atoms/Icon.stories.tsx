/* eslint-disable no-alert */
/* eslint-disable quotes */
import React from 'react';
import * as Icons from '@ant-design/icons';
import Icon from '../../src/components/atoms/Icon';

const ignore = ['createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor'];

const IconList = Object.keys(Icons).filter((i) => !ignore.includes(i));

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    icon: {
      options: IconList,
      control: { type: 'select' },
    },
    fontSize: {
      control: { type: 'range', min: 20, max: 150, step: 10 },
    },
    rotate: {
      control: { type: 'range', min: 0, max: 360, step: 45 },
    },
  },
};

function DefaultTemplate(args) {
  const { fontSize, color } = args;
  args.style = { fontSize, color };
  return <Icon src={args.icon} {...args} />;
}

function CustomIconTemplate(args) {
  return <Icon src={args.iconUrl} />;
}

export const Default = DefaultTemplate.bind({});
Default.args = {
  icon: IconList[0],
  rotate: 0,
  spin: false,
  fontSize: 100,
  color: 'red',
};

export const CustomIcon = CustomIconTemplate.bind({});
CustomIcon.parameters = {
  controls: { exclude: ['icon', 'fontSize', 'rotate'] },
};
CustomIcon.args = {
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/2214px-How_to_use_icon.svg.png',
};
