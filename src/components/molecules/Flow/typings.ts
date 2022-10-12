import type { Node, Edge } from 'reactflow';

export type FlowEdge = Edge;

export type FlowContainerRef = {
  current: HTMLDivElement | null;
};

export type handleAddType = (node: FlowDefaultNode) => void;

export type onSubmitNoteType = (payload: payloadType) => void;

export type payloadType = { [key: string]: any };

export type i18nType = { [key: string]: any };

export interface FlowNode extends Node {}

export interface NoteTypeFormProps {
  onSubmit: onSubmitNoteType;
}

export interface NoteTypeModalProps {
  id: string;
  icon: string;
  label: string;
  i18n?: i18nType;
  form: (props: NoteTypeFormProps) => JSX.Element;
  onSubmit: onSubmitNoteType;
}

export interface FlowDefaultNode {
  label: string;
  icon: string;
  static?: boolean;
  color?: string;
  payload?: payloadType;
}

export interface FlowNodeType {
  id: string;
  icon: string;
  label: string;
  form: (props: NoteTypeFormProps) => JSX.Element;
  onClick: (id: string) => void;
}

export interface FlowProps {
  i18n?: i18nType;
  draggable?: boolean;
  defaultNodes?: FlowDefaultNode[];
  nodeTypes: FlowNodeType[];
  onRemove?: (nodes: FlowDefaultNode[]) => void;
  onAdd?: (nodes: FlowDefaultNode[]) => void;
}

export interface ReactFlowSetters {
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
}

export interface HandleRemoveActions extends ReactFlowSetters {
  onRemove?: (nodes: FlowDefaultNode[]) => void;
}
