import React from 'react';
import { SelectProps, DefaultOptionType } from 'antd/lib/select';
export { DefaultOptionType as OptionType } from 'antd/lib/select';

export type SelectFetchOptionsType =
  | string
  | React.FocusEvent<HTMLElement, Element>;

export interface SelectAsyncProps extends SelectProps {
  defaultOptions?: DefaultOptionType[];
  fetchOptions?: (data: SelectFetchOptionsType) => Promise<DefaultOptionType[]>;
}
