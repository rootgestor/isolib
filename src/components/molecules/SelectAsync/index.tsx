import React, { useEffect, useState, useRef, useMemo } from 'react';
import Select from 'antd/lib/select';
import debounce from 'lodash/debounce';

import {
  SelectAsyncProps,
  OptionType,
  SelectFetchOptionsType,
} from './typings';

function SelectAsync({
  fetchOptions,
  defaultOptions = [],
  defaultValue,
  onChange,
  ...props
}: SelectAsyncProps) {
  const [selected, setSelected] = useState('');
  const [options, setOptions] = useState(() => defaultOptions);
  const fetchRef = useRef(0);

  const loadOptions = (val: SelectFetchOptionsType) => {
    fetchRef.current += 1;
    const fetchId = fetchRef.current;
    fetchOptions(val, selected).then((newOptions: OptionType[]) => {
      if (fetchId !== fetchRef.current) return;

      setOptions(newOptions);
    });
  };

  const debounceFetcher = useMemo(() => {
    return debounce(loadOptions, 50);
  }, [fetchOptions]);

  const handleOnChange = (val: string, option: OptionType | OptionType[]) => {
    setSelected(val);
    if (onChange) onChange(val, option);
  };

  useEffect(() => {
    loadOptions('');
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      onFocus={debounceFetcher}
      {...props}
      value={selected}
      onChange={handleOnChange}
      options={options}
    />
  );
}

export default SelectAsync;
