import type { Node } from 'reactflow';
import type { FlowDefaultNode } from '../typings';

export const exportNode = (nodes: Node[]): FlowDefaultNode[] => {
  return nodes
    .filter((node) => node.type === 'FlowNode')
    .map(({ data }) => {
      const variables: FlowDefaultNode = {
        label: data.label,
        icon: data.icon,
      };

      if (data.color) variables.color = data.color;

      if (data.static) variables.static = data.static;

      if (data.payload) variables.payload = data.payload;

      return variables;
    });
};
