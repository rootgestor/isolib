import type { ButtonProps as DefaultButtonProps } from 'antd/lib/button';
export declare type SizeType = string | undefined | any;
export interface ButtonProps extends Partial<DefaultButtonProps> {
    size?: SizeType;
    icon?: string;
}
