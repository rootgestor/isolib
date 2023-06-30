import React from 'react';
import { SelectProps, DefaultOptionType } from 'antd/lib/select';
export { DefaultOptionType as OptionType } from 'antd/lib/select';
export declare type SelectFetchOptionsType = string | React.FocusEvent<HTMLElement, Element>;
export interface SelectAsyncProps extends SelectProps {
    defaultOptions?: DefaultOptionType[];
    fetchOptions: (data: SelectFetchOptionsType, id: string) => Promise<DefaultOptionType[]>;
}
