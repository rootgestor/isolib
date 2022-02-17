import React from 'react';

import Breadcrumb from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  // // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <Breadcrumb {...args} />;
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  onClick: (url) => alert(url),
  breadcrumbNameMap: {
    '/users': 'Usuarios',
    '/user/1': 'Usuario > Detalle',
  },
};
