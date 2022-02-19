import React, { useState, useRef, useMemo } from 'react';
import debounce from 'lodash/debounce';

import Select from 'antd/lib/select';
import PropTypes from 'prop-types';

import './styles.less';

function DebounceSelect({ fetchOptions, ...props }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setLoading(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setLoading(false);
        setOptions(newOptions);
      });
    };

    return debounce(loadOptions, 800);
  }, [fetchOptions]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      onFocus={debounceFetcher}
      {...props}
      loading={loading}
      options={options}
    />
  );
}

DebounceSelect.propTypes = {
  fetchOptions: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ]),
};

DebounceSelect.defaultProps = {
  onChange: () => {},
  value: '',
};

export default DebounceSelect;
