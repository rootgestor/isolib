import React from 'react';

import Breadcrumb from '../../src/components/molecules/Breadcrumb';
import type { BreadcrumbProps } from '../../src';
import '../../src/styles/Breadcrumb.less';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args: BreadcrumbProps) {
  return <Breadcrumb {...args} />;
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  onClick: (url: string) => alert(url),
  breadcrumbNameMap: [
    {
      label: 'Config',
    },
    {
      label: 'Usuarios',
      href: '/users',
    },
    {
      label: 'Detalle',
      href: '/users/1',
    },
  ],
};
