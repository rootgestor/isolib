/* eslint-disable no-alert */
/* eslint-disable quotes */
import React from 'react';

import TextCollapse from '../src/components/molecules/TextCollapse';
import type { TextCollapseProps } from '../src';
import '../src/styles/TextCollapse.less';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/TextCollapse',
  component: TextCollapse,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export function Text() {
  const args: TextCollapseProps = {
    textSpace: 30,
    textMore: 'más',
    textLess: 'menos',
  };
  return (
    <div style={{ width: 500 }}>
      <TextCollapse {...args}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </TextCollapse>
    </div>
  );
}
