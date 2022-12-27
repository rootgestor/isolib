import type { Node, Edge } from 'reactflow';
import type { FlowDefaultNode } from '../typings';

export const exportNode = (nodes: Node[], edges: Edge[]): FlowDefaultNode[] => {
  return nodes
    .filter((node) => node.type === 'FlowNode')
    .map(({ data, id }) => {
      const source = edges.find((edge) => edge.source === id)?.id;
      const target = edges.find((edge) => edge.target === id)?.id;

      const variables: FlowDefaultNode = {
        label: data.label,
        icon: data.icon,
      };

      if (!source || !target) variables.unrelated = true;

      if (data.color) variables.color = data.color;

      if (data.static) variables.static = data.static;

      if (data.payload) variables.payload = data.payload;

      return variables;
    });
};
