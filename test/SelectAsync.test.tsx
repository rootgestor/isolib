import React from 'react';
import { SelectAsync } from '../dist/index';
// const { render } = require('@testing-library/react');
const ShallowRenderer = require('react-test-renderer/shallow');

const args = {
  mode: 'multiple',
  placeholder: 'Select users',
  style: { width: '100%' },
  defaultValue: ['asdj'],
  defaultOptions: [{ label: 'sasasdss', value: 'asdj' }],
};

describe('SelectAsync', () => {
  const renderer = new ShallowRenderer();

  it('render snapshot', () => {
    const selectAsync = renderer.render(<SelectAsync {...args} />);
    expect(selectAsync).toMatchSnapshot();
  });

  // it('renders without crashing', () => {
  //   const { container } = render(<Breadcrumb {...args} />);
  //   expect(container).toBe(true);
  // });
});
