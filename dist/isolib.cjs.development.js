'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var DefaultBreadcrumb = _interopDefault(require('antd/lib/breadcrumb'));
var Select = _interopDefault(require('antd/lib/select'));
var debounce = _interopDefault(require('lodash/debounce'));
var DefaultTable = _interopDefault(require('antd/lib/table'));
var icons = require('@ant-design/icons');
var DefaultButton = _interopDefault(require('antd/lib/button'));
var classNames = _interopDefault(require('classnames'));

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

  return React__default.createElement(DefaultBreadcrumb, {
    style: {
      margin: '16px 0'
    }
  }, urlList.map(function (url) {
    return React__default.createElement(DefaultBreadcrumb.Item, {
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

  var _useState = React.useState(function () {
    return defaultValue;
  }),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = React.useState(function () {
    return defaultOptions;
  }),
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = React.useState(false),
      loading = _useState3[0],
      setLoading = _useState3[1];

  var fetchRef = React.useRef(0);
  var debounceFetcher = React.useMemo(function () {
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

  return React__default.createElement(Select, Object.assign({
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
  var namespace = 'isolib-table-msg isolib-table-msg-icon';

  if (important) {
    return React__default.createElement(icons.BellFilled, {
      className: namespace + "--selected"
    });
  }

  return React__default.createElement(icons.BellOutlined, {
    className: namespace + "--no-selected"
  });
}

var getRowClassName = (function (hoverID) {
  return function (record) {
    var namespace = 'isolib-table-msg';
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

var _excluded$1 = ["columns", "dataSource", "hidePagination", "loading", "onChange", "onRowClick", "pagination", "isMessage"];

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
      _ref$isMessage = _ref.isMessage,
      isMessage = _ref$isMessage === void 0 ? false : _ref$isMessage,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  var _useState = React.useState(''),
      hover = _useState[0],
      setHover = _useState[1];

  var additionalColumns = [];

  if (isMessage) {
    additionalColumns.push({
      dataIndex: 'important',
      key: 'important',
      width: 40,
      render: function render(_i, res) {
        return React__default.createElement(ImportantIcon, Object.assign({}, res));
      }
    });
  }

  var handleRowClick = function handleRowClick(record) {
    return function () {
      if (onRowClick) onRowClick(record);
    };
  };

  return React__default.createElement("div", {
    className: "" + (isMessage ? 'isolib-table-msg' : '')
  }, React__default.createElement(DefaultTable, Object.assign({
    size: "middle",
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
    rowClassName: isMessage ? getRowClassName(hover) : '',
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
  return React__default.createElement("div", {
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
  return React__default.createElement(DefaultButton, {
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
  return React__default.createElement("div", {
    ref: innerRef,
    style: collapsed && space ? {
      paddingRight: space
    } : {},
    className: classNames('isolib-text-collapse-internal', {
      'isolib-text-collapse-internal--collapsed': collapsed
    })
  }, children);
};

function TextCollapse(_ref) {
  var children = _ref.children,
      textSpace = _ref.textSpace,
      textLess = _ref.textLess,
      textMore = _ref.textMore,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;

  var _useState = React.useState(true),
      collapsed = _useState[0],
      setCollapsed = _useState[1];

  var _useState2 = React.useState(true),
      buttonHidden = _useState2[0],
      setButtonHidden = _useState2[1];

  var buttonRef = React.useRef(null);
  var internalRef = React.useRef(null);
  var textRef = React.useRef(null);

  var handleClick = function handleClick() {
    setCollapsed(!collapsed);
  };

  React.useEffect(function () {
    if (internalRef.current && textRef.current) {
      var textWidth = textRef.current.offsetWidth;
      var innerWidth = internalRef.current.offsetWidth;
      var bHidden = !!(textWidth + textSpace < innerWidth);
      setButtonHidden(bHidden);
    }
  }, [textSpace]);
  return React__default.createElement(Container, {
    style: style
  }, React__default.createElement(Internal, {
    collapsed: collapsed,
    innerRef: internalRef,
    space: textSpace
  }, React__default.createElement("span", {
    ref: textRef
  }, children), React__default.createElement(Button, {
    innerRef: buttonRef,
    collapsed: collapsed,
    onClick: handleClick,
    hidden: buttonHidden
  }, collapsed ? textMore : textLess)));
}

exports.Breadcrumb = Breadcrumb;
exports.SelectAsync = SelectAsync;
exports.Table = Table;
exports.TextCollapse = TextCollapse;
//# sourceMappingURL=isolib.cjs.development.js.map
