import React, { useEffect, useRef } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import { exportNode, nodesRelocation } from '../helpers';

import { mainColor, dxBetweenStartAndNode } from '../helpers';

import type {
  FlowNode,
  FlowDefaultNode,
  FlowEdge,
  payloadType,
} from '../typings';

const circleStyles: React.CSSProperties = {
  width: 24,
  height: 24,
  borderRadius: '50%',
  textTransform: 'uppercase',
  textAlign: 'center',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  fontSize: '.3rem',
};

const initialNodes: FlowNode[] = [
  {
    id: 'start',
    type: 'input',
    data: { label: 'Start' },
    style: {
      ...circleStyles,
      background: mainColor,
      borderColor: mainColor,
      color: '#fff',
    },
    position: { x: 63, y: 0 },
    draggable: true,
  },
  {
    id: 'end',
    type: 'output',
    style: {
      ...circleStyles,
      background: mainColor,
      borderColor: mainColor,
      color: '#fff',
    },
    data: { label: 'End' },
    position: { x: 63, y: dxBetweenStartAndNode },
    draggable: true,
  },
];

const initialEdges: FlowEdge[] = [
  {
    id: 'start-end',
    type: 'FlowEdge',
    source: 'start',
    target: 'end',
  },
];

interface BuildFlowData {
  source: string;
  target: string;
  static?: boolean;
}

interface FlowHookProps {
  openModal: (isOpen: boolean) => void;
  onAdd?: (nodes: FlowDefaultNode[]) => void;
  onRemove?: (nodes: FlowDefaultNode[]) => void;
  defaultNodes?: FlowDefaultNode[];
  draggable?: boolean;
}

const useFlow = ({
  defaultNodes = [],
  onRemove,
  onAdd,
  openModal,
  draggable,
}: FlowHookProps) => {
  const EdgeDataRef = useRef({ idNode: '', idEdge: '' });
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onClickEdge = (idNode: string, idEdge: string) => {
    EdgeDataRef.current = { idNode, idEdge };
    openModal(true);
  };

  const buildFlowEdge = (data: BuildFlowData): FlowEdge => {
    const curDate = String(Math.random() * 100000);
    const { source, target } = data;
    return {
      id: curDate,
      type: 'FlowEdge',
      source,
      target,
      data: {
        target,
        static: data.static,
        onClick: onClickEdge,
      },
    };
  };

  const handleRemove = (id: string) => {
    let nodeList: FlowNode[] = [];

    setNodes((nodes) => {
      setEdges((edges) => {
        const index = nodes.findIndex((node) => node.id === id);

        const afterElement = nodes[index + 1];
        const source = nodes[index - 1].id;
        const target = afterElement.id;

        const added = buildFlowEdge({
          static: afterElement.data.static,
          source,
          target,
        });

        const filtered = edges.filter(
          (edge) => edge.source !== id && edge.target !== id
        );
        return [...filtered, added];
      });

      nodeList = nodes.filter((node) => node.id !== id);
      return nodesRelocation(nodeList);
    });

    if (onRemove) {
      onRemove(exportNode(nodeList));
    }
  };

  const buildFlowNode = (
    data: FlowDefaultNode,
    payload: payloadType
  ): FlowNode => {
    const curDate = String(Math.random() * 100000);
    return {
      id: curDate,
      type: 'FlowNode',
      position: { x: 0, y: 0 },
      draggable,
      data: {
        ...data,
        payload,
        onRemove: () => handleRemove(curDate),
      },
    };
  };

  const handleAdd =
    (defaultNode: FlowDefaultNode) => (payload: payloadType) => {
      let nodesCopy: FlowNode[] = [];

      const { idNode, idEdge } = EdgeDataRef.current;
      const node = buildFlowNode(defaultNode, payload);

      setNodes((nodes) => {
        setEdges((edges) => {
          const deleted = edges.find((edge) => edge.id === idEdge);
          if (!deleted) return edges;

          const edgeCopy = edges.filter((edge) => edge.id !== idEdge);

          const addedEdges = [
            buildFlowEdge({
              source: deleted.source,
              target: node.id,
            }),
            buildFlowEdge({
              source: node.id,
              target: deleted.target,
            }),
          ];

          return edgeCopy.concat(addedEdges);
        });

        nodesCopy = [...nodes];
        const index = nodesCopy.findIndex((node) => node.id === idNode);
        nodesCopy.splice(index, 0, node);
        return nodesRelocation(nodesCopy);
      });

      if (onAdd) {
        onAdd(exportNode(nodesCopy));
      }

      openModal(false);
    };

  useEffect(() => {
    const res = defaultNodes.reduce(
      (initial, data: FlowDefaultNode, key: number) => {
        const beforeItem = initial.nodes[key - 1];

        const node = buildFlowNode(data, data.payload || {});
        const edge = buildFlowEdge({
          static: data.static,
          source: beforeItem ? beforeItem.id : 'start',
          target: node.id,
        });

        return {
          ...initial,
          nodes: [...initial.nodes, node],
          edges: [...initial.edges, edge],
        };
      },
      { nodes: [] as FlowNode[], edges: [] as FlowEdge[] }
    );

    const [start, end] = initialNodes.map((item) => ({ ...item, draggable }));
    const nodes = nodesRelocation([start, ...res.nodes, end]);
    const sourceIndex = nodes.length - 2;

    const endEdge = buildFlowEdge({
      source: nodes[sourceIndex].id,
      target: 'end',
    });

    setNodes(nodes);
    setEdges([...res.edges, endEdge]);
  }, []);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    handleAdd,
  };
};

export default useFlow;
