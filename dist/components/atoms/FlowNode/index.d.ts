import React from 'react';
interface FlowNodeProps {
    data: {
        icon: string;
        label: string;
        static: boolean;
        color?: string;
        onRemove: () => void;
    };
}
export declare const FlowNode: React.MemoExoticComponent<({ data }: FlowNodeProps) => JSX.Element>;
export {};
