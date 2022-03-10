import React, { useState, useRef, useMemo } from 'react';
import Select from 'antd/lib/select';
import debounce from 'lodash/debounce';

import {
  SelectAsyncProps,
  OptionType,
  SelectFetchOptionsType,
} from './interface.d';

export function SelectAsync({
  fetchOptions,
  defaultOptions,
  defaultValue,
  onChange,
  ...props
}: SelectAsyncProps) {
  const [value, setValue] = useState(() => defaultValue);
  const [options, setOptions] = useState(() => defaultOptions);
  const [loading, setLoading] = useState(false);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (val: SelectFetchOptionsType) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setLoading(true);
      fetchOptions(val).then((newOptions: OptionType[]) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setLoading(false);
        setOptions(newOptions);
      });
    };

    return debounce(loadOptions, 800);
  }, [fetchOptions]);

  const handleOnChange = (val: string, option: OptionType | OptionType[]) => {
    setValue(val);
    if (onChange) onChange(val, option);
  };

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      onFocus={debounceFetcher}
      {...props}
      loading={loading}
      value={value}
      onChange={handleOnChange}
      options={options}
    />
  );
}
