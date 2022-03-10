import React, { useState, useRef, useMemo, useEffect } from 'react';
import DefaultBreadcrumb from 'antd/lib/breadcrumb';
import Select from 'antd/lib/select';
import debounce from 'lodash-es/debounce';
import DefaultTable from 'antd/lib/table';
import { BellFilled, BellOutlined } from '@ant-design/icons';
import DefaultButton from 'antd/lib/button';
import classNames from 'classnames';

var Breadcrumb = function Breadcrumb(_ref) {
  var breadcrumbNameMap = _ref.breadcrumbNameMap,
      onClick = _ref.onClick;
  var urlList = Object.keys(breadcrumbNameMap);

  var handleClick = function handleClick(url) {
    return function (event) {
      event.preventDefault();
      onClick(url);
      return false;
    };
  };

  return React.createElement(DefaultBreadcrumb, {
    style: {
      margin: '16px 0'
    }
  }, urlList.map(function (url) {
    return React.createElement(DefaultBreadcrumb.Item, {
      key: url,
      href: "#",
      onClick: handleClick(url)
    }, breadcrumbNameMap[url]);
  }));
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["fetchOptions", "defaultOptions", "defaultValue", "onChange"];
function SelectAsync(_ref) {
  var fetchOptions = _ref.fetchOptions,
      defaultOptions = _ref.defaultOptions,
      defaultValue = _ref.defaultValue,
      onChange = _ref.onChange,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useState = useState(function () {
    return defaultValue;
  }),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState(function () {
    return defaultOptions;
  }),
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = useState(false),
      loading = _useState3[0],
      setLoading = _useState3[1];

  var fetchRef = useRef(0);
  var debounceFetcher = useMemo(function () {
    var loadOptions = function loadOptions(val) {
      fetchRef.current += 1;
      var fetchId = fetchRef.current;
      setLoading(true);
      fetchOptions(val).then(function (newOptions) {
        if (fetchId !== fetchRef.current) {
          return;
        }

        setLoading(false);
        setOptions(newOptions);
      });
    };

    return debounce(loadOptions, 800);
  }, [fetchOptions]);

  var handleOnChange = function handleOnChange(val, option) {
    setValue(val);
    if (onChange) onChange(val, option);
  };

  return React.createElement(Select, Object.assign({
    labelInValue: true,
    filterOption: false,
    onSearch: debounceFetcher,
    onFocus: debounceFetcher
  }, props, {
    loading: loading,
    value: value,
    onChange: handleOnChange,
    options: options
  }));
}

function ImportantIcon(_ref) {
  var important = _ref.important;
  var namespace = 'isolib-table isolib-table-icon';

  if (important) {
    return React.createElement(BellFilled, {
      className: namespace + "--selected"
    });
  }

  return React.createElement(BellOutlined, {
    className: namespace + "--no-selected"
  });
}

var getRowClassName = (function (hoverID) {
  return function (record) {
    var namespace = 'isolib-table';
    var classnames = [namespace];

    if (record.read === false) {
      classnames.push(namespace + "--unread");
    }

    if (hoverID === record._id) {
      classnames.push(namespace + "--hover");
    }

    return classnames.join(' ');
  };
});

var _excluded$1 = ["columns", "dataSource", "hidePagination", "loading", "onChange", "onRowClick", "pagination", "showImportantIcon"];
function Table(_ref) {
  var columns = _ref.columns,
      dataSource = _ref.dataSource,
      _ref$hidePagination = _ref.hidePagination,
      hidePagination = _ref$hidePagination === void 0 ? false : _ref$hidePagination,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? true : _ref$loading,
      onChange = _ref.onChange,
      onRowClick = _ref.onRowClick,
      pagination = _ref.pagination,
      _ref$showImportantIco = _ref.showImportantIcon,
      showImportantIcon = _ref$showImportantIco === void 0 ? false : _ref$showImportantIco,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  var _useState = useState(''),
      hover = _useState[0],
      setHover = _useState[1];

  var additionalColumns = [];

  if (showImportantIcon) {
    additionalColumns.push({
      dataIndex: 'important',
      key: 'important',
      width: 40,
      render: function render(_i, res) {
        return React.createElement(ImportantIcon, Object.assign({}, res));
      }
    });
  }

  var handleRowClick = function handleRowClick(record) {
    return function () {
      if (onRowClick) onRowClick(record);
    };
  };

  return React.createElement("div", {
    className: "isolib-table"
  }, React.createElement(DefaultTable, Object.assign({
    size: "small",
    scroll: {
      y: '100%'
    }
  }, rest, {
    rowSelection: {
      type: 'checkbox'
    },
    columns: [].concat(additionalColumns, columns),
    dataSource: dataSource,
    pagination: !hidePagination && _extends({}, pagination, {
      showSizeChanger: true,
      position: ['bottomCenter']
    }),
    onChange: onChange,
    loading: loading,
    rowKey: function rowKey(record) {
      return record._id;
    },
    rowClassName: getRowClassName(hover),
    onRow: function onRow(record) {
      return {
        onClick: handleRowClick(record),
        onMouseEnter: function onMouseEnter() {
          return setHover(record._id);
        },
        onMouseLeave: function onMouseLeave() {
          return setHover('');
        }
      };
    }
  })));
}

var Container = function Container(_ref) {
  var children = _ref.children,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return React.createElement("div", {
    className: "isolib-text-collapse isolib-text-collapse-container",
    style: style
  }, children);
};

var Button = function Button(_ref) {
  var children = _ref.children,
      collapsed = _ref.collapsed,
      hidden = _ref.hidden,
      innerRef = _ref.innerRef,
      onClick = _ref.onClick;
  return React.createElement(DefaultButton, {
    type: "link",
    className: "isolib-text-collapse-button",
    ref: innerRef,
    hidden: hidden,
    onClick: onClick,
    style: collapsed ? {
      position: 'absolute'
    } : {}
  }, children);
};

var Internal = function Internal(_ref) {
  var innerRef = _ref.innerRef,
      collapsed = _ref.collapsed,
      space = _ref.space,
      children = _ref.children;
  return React.createElement("div", {
    ref: innerRef,
    style: collapsed && space ? {
      paddingRight: space
    } : {},
    className: classNames('isolib-text-collapse-internal', {
      'isolib-text-collapse-internal--collapsed': collapsed
    })
  }, children);
};

/* eslint-disable react/forbid-prop-types */
function TextCollapse(_ref) {
  var children = _ref.children,
      textSpace = _ref.textSpace,
      textLess = _ref.textLess,
      textMore = _ref.textMore,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;

  var _useState = useState(true),
      collapsed = _useState[0],
      setCollapsed = _useState[1];

  var _useState2 = useState(true),
      buttonHidden = _useState2[0],
      setButtonHidden = _useState2[1];

  var buttonRef = useRef(null);
  var internalRef = useRef(null);
  var textRef = useRef(null);

  var handleClick = function handleClick() {
    setCollapsed(!collapsed);
  };

  useEffect(function () {
    if (internalRef.current && textRef.current) {
      var textWidth = textRef.current.offsetWidth;
      var innerWidth = internalRef.current.offsetWidth;
      setButtonHidden(textWidth + textSpace < innerWidth);
    }
  }, []);
  return React.createElement(Container, {
    style: style
  }, React.createElement(Internal, {
    collapsed: collapsed,
    innerRef: internalRef,
    space: textSpace
  }, React.createElement("span", {
    ref: textRef
  }, children), React.createElement(Button, {
    innerRef: buttonRef,
    collapsed: collapsed,
    onClick: handleClick,
    hidden: buttonHidden
  }, collapsed ? textMore : textLess)));
}

export { Breadcrumb, SelectAsync, Table, TextCollapse };
//# sourceMappingURL=isolib.esm.js.map
