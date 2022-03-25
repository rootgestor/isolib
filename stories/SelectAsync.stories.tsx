import React from 'react';

import SelectAsync from '../src/components/molecules/SelectAsync';
import { OptionType, SelectAsyncProps, JSONType } from '../src';
import '../src/styles/SelectAsync.less';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/SelectAsync',
  component: SelectAsync,
};

interface fakeCallDataProps {
  data?: OptionType[];
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

function fakeCallData(responseTime: number) {
  return new Promise((resolve) => {
    const data: JSONType[] = [];

    for (let i = 1; i <= 31; i += 1) {
      data.push({
        id: i,
        fullname: 'Santiago Ruiz Espitia',
        subject: 'Este es un asunto de prueba',
        date: `Feb ${i}`,
        important: i % 5 === 0 || i % 6 === 0,
        read: i % 2 === 0 || i % 3 === 0,
      });
    }

    setTimeout(() => resolve({ data }), responseTime);
  });
}

async function fetchUserList() {
  const { data }: fakeCallDataProps = await fakeCallData(2000);
  return data.map((employee) => ({
    label: `${employee.fullname} (${employee.id})`,
    value: employee.id,
  }));
}

function Template(args: SelectAsyncProps) {
  const [value, setValue] = React.useState([]);

  return (
    <SelectAsync
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      fetchOptions={fetchUserList}
    />
  );
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  mode: 'multiple',
  placeholder: 'Select users',
  style: { width: '100%' },
  defaultValue: ['asdj'],
  defaultOptions: [{ label: 'sasasdss', value: 'asdj' }],
};
