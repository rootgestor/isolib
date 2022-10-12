import type { FlowNode } from '../typings';
import {
  dxBetweenStartAndNode,
  dxBetweenNodes,
  dxLessWhenStaticNode,
} from './index';

export const nodesRelocation = (nodes: FlowNode[]) => {
  return nodes.reduce((initial, node, key) => {
    const isStart = key === 0;
    const isSecond = key === 1;
    const beforeItem = initial[key - 1];
    if (isStart) {
      node.position.y = 0;
    } else if (isSecond) {
      node.position.y = dxBetweenStartAndNode;
    } else {
      const positionY = beforeItem?.position.y;
      node.position.y = positionY + dxBetweenNodes;
    }

    if (beforeItem?.id !== 'start' && node.data.static) {
      node.position.y -= dxLessWhenStaticNode;
    }

    return [...initial, node];
  }, [] as FlowNode[]);
};
