/* eslint-disable no-alert */
/* eslint-disable quotes */
import React from 'react';

import TextCollapse from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/TextCollapse',
  component: TextCollapse,
  // // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return (
    <div style={{ width: 500 }}>
      <TextCollapse {...args} />
    </div>
  );
}

export const Text = Template.bind({});
Text.args = {
  text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  textSpace: 30,
  textButton: 'más',
};

export const Component = Template.bind({});
Component.args = {
  text: (
    <span>
      <span>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </span>
      <span>
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting, remaining essentially
        unchanged. It was popularised in the 1960s with the release of Letraset
        sheets containing Lorem Ipsum passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of Lorem
        Ipsum.
      </span>
    </span>
  ),
  textSpace: 30,
  textButton: 'más',
};
