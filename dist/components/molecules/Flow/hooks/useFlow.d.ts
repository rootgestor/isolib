import type { FlowDefaultNode, payloadType } from '../typings';
interface FlowHookProps {
    openModal: (isOpen: boolean) => void;
    onChange?: (nodes: FlowDefaultNode[]) => void;
    defaultNodes?: FlowDefaultNode[];
    draggable?: boolean;
}
declare const useFlow: ({ defaultNodes, onChange, openModal, draggable, }: FlowHookProps) => {
    nodes: import("reactflow").Node<any>[];
    edges: import("reactflow").Edge<any>[];
    onNodesChange: (changes: import("reactflow").NodeChange[]) => void;
    onEdgesChange: (changes: import("reactflow").EdgeChange[]) => void;
    handleAdd: (defaultNode: FlowDefaultNode) => (payload: payloadType) => void;
    onConnect: (params: any) => void;
};
export default useFlow;
