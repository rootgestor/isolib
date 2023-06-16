import type { ButtonProps as DefaultButtonProps, ButtonSize as DefaultSizeType } from 'antd/lib/button';
export declare type SizeType = DefaultSizeType | 'bigger';
export interface ButtonProps extends Omit<DefaultButtonProps, 'size'> {
    size?: SizeType;
    icon?: string;
}
