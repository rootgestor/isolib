/* eslint-disable no-alert */
/* eslint-disable quotes */
import React from 'react';
import Table from '../../src/components/molecules/Table';
import '../../src/styles/Table.less';
import type {
  TableProps,
  TableRecord,
  TablePaginationConfig,
  SorterResult,
} from '../../src';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/Table',
  component: Table,
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
    render: (subject: string | number | boolean, record: TableRecord) => (
      <span>
        {subject}
        <span style={{ fontWeight: 200 }}>
          {' - '}
          {record.message}
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

interface RowExample {
  _id: string | number;
  fullname: string;
  subject: string;
  message: string;
  date: string;
  important: boolean;
  read: boolean;
}

const dataSource: RowExample[] = [];

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
function Template(args: TableProps) {
  return <Table {...args} />;
}

export const Default = Template.bind({});
Default.args = {
  columns,
  dataSource,
  onChange: (
    page: TablePaginationConfig,
    _filter: TableRecord,
    sorter: SorterResult
  ) =>
    alert(`
    current:${page.current}
    pageSize: ${page.pageSize}
    column: ${sorter.columnKey}
    order: ${sorter.order}
    `),
  onRowClick: (record: TableRecord) => alert(`click id: ${record._id}`),
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};

export const Message = Template.bind({});
Message.args = {
  ...Default.args,
  isMessage: true,
};
