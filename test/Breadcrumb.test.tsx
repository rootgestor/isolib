import React from 'react';
import { Breadcrumb } from '../dist/index';
// const { render } = require('@testing-library/react');
const ShallowRenderer = require('react-test-renderer/shallow');

const args = {
  onClick: (url: string) => alert(url),
  breadcrumbNameMap: {
    '/users': 'Usuarios',
    '/user/1': 'Usuario > Detalle',
  },
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
