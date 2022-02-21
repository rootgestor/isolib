import React, { useState, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

import Select from 'antd/lib/select';
import PropTypes from 'prop-types';

import './styles.less';

function SelectAsync({
  fetchOptions,
  defaultOptions,
  defaultValue,
  onChange,
  ...props
}) {
  const [value, setValue] = useState(() => defaultValue);
  const [options, setOptions] = useState(() => defaultOptions);
  const [loading, setLoading] = useState(false);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (val) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setLoading(true);
      fetchOptions(val).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setLoading(false);
        setOptions(newOptions);
      });
    };

    return debounce(loadOptions, 800);
  }, [fetchOptions]);

  const handleOnChange = (val) => {
    setValue(val);
    if (onChange) onChange(val);
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

SelectAsync.propTypes = {
  defaultOptions: PropTypes.arrayOf(PropTypes.shape({})),
  fetchOptions: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
};

SelectAsync.defaultProps = {
  defaultOptions: [],
  onChange: () => {},
  defaultValue: [],
};

export default SelectAsync;
