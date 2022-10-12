/// <reference types="react" />
export interface TextCollapseProps {
    children?: JSX.Element | string;
    textSpace: number;
    textLess: string;
    textMore: string;
    style?: {
        [key: string]: string;
    };
}
export interface TextCollapseInternalProps {
    collapsed: boolean;
    space: number;
}
export interface TextCollapseButtonProps {
    collapsed: boolean;
}
export interface ButtonCollapseProps {
    children?: JSX.Element | string;
    collapsed: boolean;
    hidden: boolean;
    innerRef: any;
    onClick: () => void;
}
export interface ContainerProps {
    children: JSX.Element;
    style: {
        [key: string]: string;
    };
}
export interface InternalProps {
    collapsed: boolean;
    space?: number;
    innerRef: any;
    children?: JSX.Element | JSX.Element[];
}
