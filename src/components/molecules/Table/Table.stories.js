/* eslint-disable no-alert */
/* eslint-disable quotes */
import React from 'react';

import Table from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Table',
  component: Table,
  // // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'fullname',
    key: 'name',
    responsive: ['md'],
    width: '20%',
  },
  {
    title: 'Asunto',
    dataIndex: 'subject',
    key: 'subject',
    render: (_s, record) => (
      <span>
        {record.subject}
        <span style={{ fontWeight: 200 }}>
          {' - '}
          {record.text}
        </span>
      </span>
    ),
  },
  {
    title: 'Fecha',
    key: 'date',
    dataIndex: 'date',
    sorter: true,
    width: 100,
    responsive: ['md'],
  },
];

const dataSource = [];

for (let i = 1; i <= 31; i += 1) {
  dataSource.push({
    _id: i,
    fullname: 'Santiago Ruiz Espitia',
    subject: 'Este es un asunto de prueba',
    message:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets",
    date: `Feb ${i}`,
    important: i % 5 === 0 || i % 6 === 0,
    read: i % 2 === 0 || i % 3 === 0,
  });
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return <Table {...args} />;
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  columns,
  dataSource,
  onChange: (page, _filter, sorter) =>
    alert(`
    current:${page.current}
    pageSize: ${page.pageSize}
    column: ${sorter.columnKey}
    order: ${sorter.order}
    `),
  onRowClick: (res) => alert(`click id: ${res._id}`),
};
