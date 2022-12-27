import React, { useEffect, useRef, useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
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
  onChange?: (nodes: FlowDefaultNode[]) => void;
  defaultNodes?: FlowDefaultNode[];
  draggable?: boolean;
}

const useFlow = ({
  defaultNodes = [],
  onChange,
  openModal,
  draggable,
}: FlowHookProps) => {
  const EdgeDataRef = useRef({ idNode: '', idEdge: '' });
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onAddEdge = (idNode: string, idEdge: string) => {
    EdgeDataRef.current = { idNode, idEdge };
    openModal(true);
  };

  const onRemoveEdge = (idEdge: string) => {
    let nodeList: FlowNode[] = [];
    let edgeList: FlowEdge[] = [];

    setNodes((nodes) => {
      nodeList = [...nodes];
      return nodes;
    });

    setEdges((edges: FlowEdge[]) => {
      edgeList = edges.filter((edge) => edge.id !== idEdge);
      return edgeList;
    });

    if (onChange) {
      onChange(exportNode(nodeList, edgeList));
    }
  };

  const onConnect = useCallback((params) => {
    let nodeList: FlowNode[] = [];
    let edgeList: FlowEdge[] = [];

    setNodes((nodes) => {
      nodeList = [...nodes];
      return nodes;
    });

    setEdges((eds: FlowEdge[]) => {
      const targets = eds.filter(
        (ed) => ed.target === params.target || ed.source === params.target
      );

      const sources = eds.filter(
        (ed) => ed.target === params.source || ed.source === params.source
      );

      if (targets.length > 1 || sources.length > 1) return eds;

      edgeList = addEdge(buildFlowEdge(params), eds);
      return edgeList;
    });

    if (onChange) {
      onChange(exportNode(nodeList, edgeList));
    }
  }, []);

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
        onAdd: onAddEdge,
        onRemove: onRemoveEdge,
      },
    };
  };

  const handleRemove = (id: string) => {
    let nodeList: FlowNode[] = [];
    let edgeList: FlowEdge[] = [];

    setNodes((nodes) => {
      setEdges((edges: FlowEdge[]) => {
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

        edgeList = [...filtered, added];
        return edgeList;
      });

      nodeList = nodes.filter((node) => node.id !== id);
      return nodesRelocation(nodeList);
    });

    if (onChange) {
      onChange(exportNode(nodeList, edgeList));
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
      let edgeCopy: FlowEdge[] = [];

      const { idNode, idEdge } = EdgeDataRef.current;
      const node = buildFlowNode(defaultNode, payload);

      setNodes((nodes) => {
        setEdges((edges: FlowEdge[]) => {
          const deleted = edges.find((edge) => edge.id === idEdge);
          if (!deleted) return edges;

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

          edgeCopy = edges
            .filter((edge) => edge.id !== idEdge)
            .concat(addedEdges);
          return edgeCopy;
        });

        nodesCopy = [...nodes];
        const index = nodesCopy.findIndex((node) => node.id === idNode);
        nodesCopy.splice(index, 0, node);
        return nodesRelocation(nodesCopy);
      });

      if (onChange) {
        onChange(exportNode(nodesCopy, edgeCopy));
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
    onConnect,
  };
};

export default useFlow;
