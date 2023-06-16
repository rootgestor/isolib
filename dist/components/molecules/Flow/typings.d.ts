/// <reference types="react" />
import type { Node, Edge } from 'reactflow';
export declare type FlowEdge = Edge;
export declare type FlowContainerRef = {
    current: HTMLDivElement | null;
};
export declare type handleAddType = (node: FlowDefaultNode) => void;
export declare type onSubmitNoteType = (payload: payloadType) => void;
export declare type payloadType = {
    [key: string]: any;
};
export declare type i18nType = {
    [key: string]: string;
};
export interface FlowNode extends Node {
}
export interface NoteTypeFormProps {
    onSubmit: onSubmitNoteType;
}
export interface NoteTypeModalProps {
    id: string;
    icon: string;
    label: string;
    i18n?: i18nType;
    modal?: (props: NoteTypeFormProps) => JSX.Element;
    fields?: JSX.Element[];
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
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}
export interface HandleRemoveActions extends ReactFlowSetters {
    onRemove?: (nodes: FlowDefaultNode[]) => void;
}
