import React from 'react';
import { Breadcrumb } from '../src/index';
import type { BreadcrumbProps } from '../src/index';
const ShallowRenderer = require('react-test-renderer/shallow');

const args: BreadcrumbProps = {
  onClick: (url) => alert(url),
  breadcrumbNameMap: [
    {
      label: 'Usuarios',
      href: '/users',
    },
    {
      label: 'Detalle',
      href: '/user/1',
    },
  ],
};

describe('Breadcrumb', () => {
  const renderer = new ShallowRenderer();

  it('render snapshot', () => {
    const breadcrumb = renderer.render(<Breadcrumb {...args} />);
    expect(breadcrumb).toMatchSnapshot();
  });

  // it('renders without crashing', () => {
  //   const { container } = render(<Breadcrumb {...args} />);
  //   expect(container).toBe(true);
  // });
});
