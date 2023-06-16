import React from 'react';
import Flow from '../../src/components/molecules/Flow';
import '../../src/styles/Flow.less';
import type { FlowProps } from '../../src/components/molecules/Flow/typings';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Molecules/DatePicker',
  component: Flow,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args: FlowProps) {
  return (
    <>
      <Flow {...args}></Flow>
    </>
  );
}

function CustomForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = [...formData.entries()].reduce((initial, [key, value]) => {
      return { ...initial, [key]: value };
    }, {});
    props.onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="prueba" />
      <input type="submit" />
    </form>
  );
}

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  nodeTypes: [
    {
      id: 'approve',
      icon: 'AuditOutlined',
      label: 'Solicitud de aprobación',
      color: 'red',
      fields: [
        <input name="text" type="text" value="" />,
        <select name="select">
          <option>selecciona...</option>
          <option value="value1">Valor 1</option>
          <option value="value2">Valor 2</option>
        </select>,
      ],
    },
    {
      id: 'triggerTask',
      icon: 'ReconciliationOutlined',
      label: 'Disparar tarea',
      color: 'green',
    },
    {
      id: 'sendEmail',
      icon: 'SendOutlined',
      label: 'Enviar Email',
      color: 'tomato',
    },
    {
      id: 'triggerFlow',
      icon: 'SubnodeOutlined',
      label: 'Ejecutar un flujo',
    },
  ],
};

export const WithNodes = Template.bind({});
WithNodes.args = {
  ...Default.args,
  defaultNodes: [
    {
      label: 'input - output',
      icon: 'SendOutlined',
      static: true,
    },
    {
      label: 'input - output',
      icon: 'SendOutlined',
    },
    {
      label: 'input - output',
      icon: 'SendOutlined',
    },
  ],
};

export const WithNodesAndActions = Template.bind({});
WithNodesAndActions.args = {
  ...WithNodes.args,
  onChange: (node) => console.log('onChange Node: ', node),
};

export const StaticNodes = Template.bind({});
StaticNodes.args = {
  ...WithNodesAndActions.args,
  draggable: false,
};

export const WithPayload = Template.bind({});
WithPayload.args = {
  ...WithNodesAndActions.args,
  defaultNodes: [
    {
      label: 'input - output',
      icon: 'SendOutlined',
      payload: {
        name: 'Santiago',
        lastname: 'Ruiz',
      },
    },
    {
      label: 'input - output',
      icon: 'SendOutlined',
      payload: {
        name: 'Sebastian',
        lastname: 'Parra',
      },
    },
    {
      label: 'input - output',
      icon: 'SendOutlined',
    },
  ],
};
