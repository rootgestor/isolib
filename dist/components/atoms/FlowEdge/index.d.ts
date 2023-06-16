/// <reference types="react" />
import type { BezierEdgeProps } from 'reactflow';
interface FlowEdgeProps extends Omit<BezierEdgeProps, 'id'> {
    id?: string;
}
export declare const FlowEdge: ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, data, markerEnd, }: FlowEdgeProps) => JSX.Element;
export {};
/**
 *
  
 */
