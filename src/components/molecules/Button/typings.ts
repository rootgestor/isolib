import type {
  ButtonProps as DefaultButtonProps,
  ButtonSize as DefaultSizeType,
} from 'antd/lib/button';

export type SizeType = DefaultSizeType | 'bigger';
export interface ButtonProps extends Omit<DefaultButtonProps, 'size'> {
  size?: SizeType;
  icon?: string;
}
