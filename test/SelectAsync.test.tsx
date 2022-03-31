import React from 'react';
import { SelectAsync, SelectAsyncProps } from '../src/index';
const ShallowRenderer = require('react-test-renderer/shallow');

const args: SelectAsyncProps = {
  mode: 'multiple',
  placeholder: 'Select users',
  style: { width: '100%' },
  defaultValue: ['value'],
  fetchOptions: () => Promise.resolve([]),
  defaultOptions: [{ label: 'label', value: 'value' }],
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
