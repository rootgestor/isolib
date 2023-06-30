import React, { useState, useRef, useMemo, useEffect, memo } from 'react';
import * as Icons from '@ant-design/icons';
import { BellFilled, BellOutlined } from '@ant-design/icons';
import DefaultBreadcrumb from 'antd/lib/breadcrumb';
import Select from 'antd/lib/select';
import debounce from 'lodash-es/debounce';
import DefaultTable from 'antd/lib/table';
import DefaultButton from 'antd/lib/button';
import classNames from 'classnames';
import ReactFlow, { Handle, Position, getBezierPath, useNodesState, useEdgesState, Controls } from 'reactflow';
import Modal from 'antd/lib/modal';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

var _excluded = ["src", "alt"];
function Icon(_ref) {
  var src = _ref.src,
    alt = _ref.alt,
    args = _objectWithoutPropertiesLoose(_ref, _excluded);
  var key = src;
  var Icon = Icons[key];
  if (Icon) {
    return React.createElement(Icon, Object.assign({}, args));
  }
  return React.createElement("img", {
    style: _extends({
      padding: '5px'
    }, args),
    src: src,
    alt: alt
  });
}

var Breadcrumb = function Breadcrumb(_ref) {
  var breadcrumbNameMap = _ref.breadcrumbNameMap,
    onClick = _ref.onClick;
  var handleClick = function handleClick(url) {
    return function (event) {
      event.preventDefault();
      if (url) onClick(url);
      return false;
    };
  };
  return React.createElement(DefaultBreadcrumb, {
    style: {
      margin: '16px 0'
    }
  }, breadcrumbNameMap.map(function (_ref2) {
    var label = _ref2.label,
      href = _ref2.href;
    return React.createElement(DefaultBreadcrumb.Item, {
      key: href,
      href: "#",
      onClick: handleClick(href)
    }, label);
  }));
};

var _excluded$1 = ["fetchOptions", "defaultOptions", "defaultValue", "onChange"];
function SelectAsync(_ref) {
  var fetchOptions = _ref.fetchOptions,
    _ref$defaultOptions = _ref.defaultOptions,
    defaultOptions = _ref$defaultOptions === void 0 ? [] : _ref$defaultOptions,
    defaultValue = _ref.defaultValue,
    onChange = _ref.onChange,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var _useState = useState(''),
    selected = _useState[0],
    setSelected = _useState[1];
  var _useState2 = useState(function () {
      return defaultOptions;
    }),
    options = _useState2[0],
    setOptions = _useState2[1];
  var _useState3 = useState(false),
    loading = _useState3[0],
    setLoading = _useState3[1];
  var fetchRef = useRef(0);
  var loadOptions = function loadOptions(val) {
    fetchRef.current += 1;
    var fetchId = fetchRef.current;
    setLoading(true);
    fetchOptions(val, selected).then(function (newOptions) {
      if (fetchId !== fetchRef.current) return;
      setLoading(false);
      setOptions(newOptions);
    });
  };
  var debounceFetcher = useMemo(function () {
    return debounce(loadOptions, 50);
  }, [fetchOptions]);
  var handleOnChange = function handleOnChange(val, option) {
    setSelected(val);
    if (onChange) onChange(val, option);
  };
  useEffect(function () {
    loadOptions('');
    setSelected(defaultValue);
  }, [defaultValue]);
  return React.createElement(Select, Object.assign({
    labelInValue: true,
    filterOption: false,
    onSearch: debounceFetcher,
    onFocus: debounceFetcher
  }, props, {
    loading: loading,
    value: selected,
    onChange: handleOnChange,
    options: options
  }));
}

function ImportantIcon(_ref) {
  var important = _ref.important;
  var namespace = 'isolib-table-msg isolib-table-msg-icon';
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

var _excluded$2 = ["columns", "dataSource", "hidePagination", "loading", "onChange", "onRowClick", "pagination", "isMessage"];
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
    rest = _objectWithoutPropertiesLoose(_ref, _excluded$2);
  var _useState = useState(''),
    hover = _useState[0],
    setHover = _useState[1];
  var additionalColumns = [];
  if (isMessage) {
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
    className: "isolib-table " + (isMessage ? 'isolib-table-msg' : '')
  }, React.createElement(DefaultTable, Object.assign({
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
  return React.createElement("div", {
    className: "isolib-text-collapse isolib-text-collapse-container",
    style: style
  }, children);
};

var ButtonCollapse = function ButtonCollapse(_ref) {
  var children = _ref.children,
    collapsed = _ref.collapsed,
    hidden = _ref.hidden,
    innerRef = _ref.innerRef,
    space = _ref.space,
    onClick = _ref.onClick;
  return React.createElement(DefaultButton, {
    type: "link",
    className: "isolib-text-collapse-button",
    ref: innerRef,
    hidden: hidden,
    onClick: onClick,
    style: collapsed ? {
      position: 'absolute',
      right: "-" + space + "px"
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
      var bHidden = !!(textWidth + textSpace < innerWidth);
      setButtonHidden(bHidden);
    }
  }, [textSpace]);
  return React.createElement(Container, {
    style: style
  }, React.createElement(Internal, {
    collapsed: collapsed,
    innerRef: internalRef,
    space: textSpace
  }, React.createElement("span", {
    ref: textRef
  }, children), React.createElement(ButtonCollapse, {
    innerRef: buttonRef,
    collapsed: collapsed,
    onClick: handleClick,
    hidden: buttonHidden,
    space: textSpace
  }, collapsed ? textMore : textLess)));
}

var _excluded$3 = ["icon", "size", "className"];
function Button(props) {
  var icon = props.icon,
    size = props.size,
    className = props.className,
    rest = _objectWithoutPropertiesLoose(props, _excluded$3);
  if (size === 'bigger') {
    return React.createElement(Button, Object.assign({
      className: "isolib__bigger-button " + className
    }, rest), React.createElement("div", {
      className: "isolib__bigger-button-label"
    }, props.children), !!icon && React.createElement("div", {
      className: "isolib__bigger-button-icon"
    }, React.createElement(Icon, {
      src: icon
    })));
  }
  return React.createElement(DefaultButton, Object.assign({}, props, {
    className: className,
    size: size
  }));
}

var FlowNode = /*#__PURE__*/memo(function (_ref) {
  var data = _ref.data;
  var icon = data.icon,
    label = data.label,
    onRemove = data.onRemove,
    _data$color = data.color,
    color = _data$color === void 0 ? '#6938fb' : _data$color;
  return React.createElement(React.Fragment, null, React.createElement(Handle, {
    type: "target",
    position: Position.Top,
    isConnectable: false
  }), React.createElement("div", {
    className: "react-flow__custom-node"
  }, React.createElement("div", {
    className: "react-flow__custom-node-container",
    style: {
      borderColor: color
    }
  }, React.createElement("div", {
    className: "react-flow__custom-node-header",
    style: {
      background: color
    }
  }, React.createElement("span", {
    className: "react-flow__custom-node-header-icon"
  }, React.createElement(Icon, {
    src: icon
  })), !(data != null && data["static"]) && React.createElement("span", {
    className: "react-flow__custom-node-header-close",
    onClick: onRemove
  }, React.createElement(Icon, {
    src: "CloseCircleFilled"
  }))), React.createElement("div", {
    className: "react-flow__custom-node-label"
  }, label))), React.createElement(Handle, {
    type: "source",
    position: Position.Bottom,
    id: "b",
    style: {
      bottom: 10,
      top: 'auto'
    },
    isConnectable: false
  }));
});

var FlowNode$1 = {
  __proto__: null,
  FlowNode: FlowNode
};

var FlowEdge = function FlowEdge(_ref) {
  var id = _ref.id,
    sourceX = _ref.sourceX,
    sourceY = _ref.sourceY,
    targetX = _ref.targetX,
    targetY = _ref.targetY,
    sourcePosition = _ref.sourcePosition,
    targetPosition = _ref.targetPosition,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style,
    data = _ref.data,
    markerEnd = _ref.markerEnd;
  var mainColor = '#b1b1b7';
  var _getBezierPath = getBezierPath({
      sourceX: sourceX,
      sourceY: sourceY,
      sourcePosition: sourcePosition,
      targetX: targetX,
      targetY: targetY,
      targetPosition: targetPosition,
      curvature: 0
    }),
    edgePath = _getBezierPath[0];
  var X = (sourceX + targetX) / 2;
  var Y = (sourceY + targetY) / 2;
  var node = data.target;
  var edge = id;
  return React.createElement(React.Fragment, null, React.createElement("path", {
    id: id,
    style: style,
    className: "react-flow__edge-path",
    d: edgePath,
    markerEnd: markerEnd
  }), !(data != null && data["static"]) && React.createElement("g", {
    transform: "translate(" + X + ", " + Y + ")",
    onClick: function onClick() {
      return data == null ? void 0 : data.onClick(node, edge);
    }
  }, React.createElement("rect", {
    x: "-10",
    y: "-10",
    width: "18",
    ry: "4",
    rx: "4",
    height: "18",
    fill: "white",
    stroke: mainColor
  }), React.createElement("text", {
    fill: mainColor,
    y: "3",
    x: "-5"
  }, "+")));
};
/**
 *
  
 */

var FlowEdge$1 = {
  __proto__: null,
  FlowEdge: FlowEdge
};

var useTranslate = function useTranslate(i18n) {
  return function (text) {
    return i18n ? i18n[text] : text;
  };
};

var NodeTypeModal = function NodeTypeModal(_ref) {
  var id = _ref.id,
    icon = _ref.icon,
    label = _ref.label,
    i18n = _ref.i18n,
    modal = _ref.modal,
    onSubmit = _ref.onSubmit;
  var tt = useTranslate(i18n);
  var _useState = useState(false),
    isOpen = _useState[0],
    setIsOpen = _useState[1];
  var handleCloseModal = function handleCloseModal() {
    return setIsOpen(false);
  };
  var handleClick = function handleClick() {
    if (modal) {
      setIsOpen(true);
    } else {
      onSubmit({});
    }
  };
  var handleSubmit = function handleSubmit(payload) {
    onSubmit(payload);
    handleCloseModal();
  };
  return React.createElement(React.Fragment, null, React.createElement(Button, {
    key: id,
    icon: icon,
    onClick: handleClick,
    size: "bigger",
    className: "flow-modal-add-item"
  }, label), !!modal && React.createElement(Modal, {
    title: tt('Add node'),
    open: isOpen,
    onCancel: handleCloseModal,
    footer: [React.createElement(Button, {
      onClick: handleCloseModal
    }, tt('Close'))]
  }, modal({
    onSubmit: handleSubmit
  })));
};

var exportNode = function exportNode(nodes) {
  return nodes.filter(function (node) {
    return node.type === 'FlowNode';
  }).map(function (_ref) {
    var data = _ref.data;
    var variables = {
      label: data.label,
      icon: data.icon
    };
    if (data.color) variables.color = data.color;
    if (data["static"]) variables["static"] = data["static"];
    if (data.payload) variables.payload = data.payload;
    return variables;
  });
};

var nodesRelocation = function nodesRelocation(nodes) {
  return nodes.reduce(function (initial, node, key) {
    var isStart = key === 0;
    var isSecond = key === 1;
    var beforeItem = initial[key - 1];
    if (isStart) {
      node.position.y = 0;
    } else if (isSecond) {
      node.position.y = dxBetweenStartAndNode;
    } else {
      var positionY = beforeItem == null ? void 0 : beforeItem.position.y;
      node.position.y = positionY + dxBetweenNodes;
    }
    if ((beforeItem == null ? void 0 : beforeItem.id) !== 'start' && node.data["static"]) {
      node.position.y -= dxLessWhenStaticNode;
    }
    return [].concat(initial, [node]);
  }, []);
};

var mainColor = '#6938fb';
var dxBetweenNodes = 100;
var dxBetweenStartAndNode = 80;
var dxLessWhenStaticNode = 20;

var circleStyles = {
  width: 24,
  height: 24,
  borderRadius: '50%',
  textTransform: 'uppercase',
  textAlign: 'center',
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  fontSize: '.3rem'
};
var initialNodes = [{
  id: 'start',
  type: 'input',
  data: {
    label: 'Start'
  },
  style: /*#__PURE__*/_extends({}, circleStyles, {
    background: mainColor,
    borderColor: mainColor,
    color: '#fff'
  }),
  position: {
    x: 63,
    y: 0
  },
  draggable: true
}, {
  id: 'end',
  type: 'output',
  style: /*#__PURE__*/_extends({}, circleStyles, {
    background: mainColor,
    borderColor: mainColor,
    color: '#fff'
  }),
  data: {
    label: 'End'
  },
  position: {
    x: 63,
    y: dxBetweenStartAndNode
  },
  draggable: true
}];
var initialEdges = [{
  id: 'start-end',
  type: 'FlowEdge',
  source: 'start',
  target: 'end'
}];
var useFlow = function useFlow(_ref) {
  var _ref$defaultNodes = _ref.defaultNodes,
    defaultNodes = _ref$defaultNodes === void 0 ? [] : _ref$defaultNodes,
    onRemove = _ref.onRemove,
    onAdd = _ref.onAdd,
    openModal = _ref.openModal,
    draggable = _ref.draggable;
  var EdgeDataRef = useRef({
    idNode: '',
    idEdge: ''
  });
  var _useNodesState = useNodesState(initialNodes),
    nodes = _useNodesState[0],
    setNodes = _useNodesState[1],
    onNodesChange = _useNodesState[2];
  var _useEdgesState = useEdgesState(initialEdges),
    edges = _useEdgesState[0],
    setEdges = _useEdgesState[1],
    onEdgesChange = _useEdgesState[2];
  var onClickEdge = function onClickEdge(idNode, idEdge) {
    EdgeDataRef.current = {
      idNode: idNode,
      idEdge: idEdge
    };
    openModal(true);
  };
  var buildFlowEdge = function buildFlowEdge(data) {
    var curDate = String(Math.random() * 100000);
    var source = data.source,
      target = data.target;
    return {
      id: curDate,
      type: 'FlowEdge',
      source: source,
      target: target,
      data: {
        target: target,
        "static": data["static"],
        onClick: onClickEdge
      }
    };
  };
  var handleRemove = function handleRemove(id) {
    var nodeList = [];
    setNodes(function (nodes) {
      setEdges(function (edges) {
        var index = nodes.findIndex(function (node) {
          return node.id === id;
        });
        var afterElement = nodes[index + 1];
        var source = nodes[index - 1].id;
        var target = afterElement.id;
        var added = buildFlowEdge({
          "static": afterElement.data["static"],
          source: source,
          target: target
        });
        var filtered = edges.filter(function (edge) {
          return edge.source !== id && edge.target !== id;
        });
        return [].concat(filtered, [added]);
      });
      nodeList = nodes.filter(function (node) {
        return node.id !== id;
      });
      return nodesRelocation(nodeList);
    });
    if (onRemove) {
      onRemove(exportNode(nodeList));
    }
  };
  var buildFlowNode = function buildFlowNode(data, payload) {
    var curDate = String(Math.random() * 100000);
    return {
      id: curDate,
      type: 'FlowNode',
      position: {
        x: 0,
        y: 0
      },
      draggable: draggable,
      data: _extends({}, data, {
        payload: payload,
        onRemove: function onRemove() {
          return handleRemove(curDate);
        }
      })
    };
  };
  var handleAdd = function handleAdd(defaultNode) {
    return function (payload) {
      var nodesCopy = [];
      var _EdgeDataRef$current = EdgeDataRef.current,
        idNode = _EdgeDataRef$current.idNode,
        idEdge = _EdgeDataRef$current.idEdge;
      var node = buildFlowNode(defaultNode, payload);
      setNodes(function (nodes) {
        setEdges(function (edges) {
          var deleted = edges.find(function (edge) {
            return edge.id === idEdge;
          });
          if (!deleted) return edges;
          var edgeCopy = edges.filter(function (edge) {
            return edge.id !== idEdge;
          });
          var addedEdges = [buildFlowEdge({
            source: deleted.source,
            target: node.id
          }), buildFlowEdge({
            source: node.id,
            target: deleted.target
          })];
          return edgeCopy.concat(addedEdges);
        });
        nodesCopy = [].concat(nodes);
        var index = nodesCopy.findIndex(function (node) {
          return node.id === idNode;
        });
        nodesCopy.splice(index, 0, node);
        return nodesRelocation(nodesCopy);
      });
      if (onAdd) {
        onAdd(exportNode(nodesCopy));
      }
      openModal(false);
    };
  };
  useEffect(function () {
    var res = defaultNodes.reduce(function (initial, data, key) {
      var beforeItem = initial.nodes[key - 1];
      var node = buildFlowNode(data, data.payload || {});
      var edge = buildFlowEdge({
        "static": data["static"],
        source: beforeItem ? beforeItem.id : 'start',
        target: node.id
      });
      return _extends({}, initial, {
        nodes: [].concat(initial.nodes, [node]),
        edges: [].concat(initial.edges, [edge])
      });
    }, {
      nodes: [],
      edges: []
    });
    var _initialNodes$map = initialNodes.map(function (item) {
        return _extends({}, item, {
          draggable: draggable
        });
      }),
      start = _initialNodes$map[0],
      end = _initialNodes$map[1];
    var nodes = nodesRelocation([start].concat(res.nodes, [end]));
    var sourceIndex = nodes.length - 2;
    var endEdge = buildFlowEdge({
      source: nodes[sourceIndex].id,
      target: 'end'
    });
    setNodes(nodes);
    setEdges([].concat(res.edges, [endEdge]));
  }, []);
  return {
    nodes: nodes,
    edges: edges,
    onNodesChange: onNodesChange,
    onEdgesChange: onEdgesChange,
    handleAdd: handleAdd
  };
};

// import './styles.less';
var Flow = function Flow(props) {
  var containerRef = useRef(null);
  var tt = useTranslate(props.i18n);
  var _useState = useState(0),
    horizontal = _useState[0],
    setHorizontal = _useState[1];
  var _useState2 = useState(false),
    isOpen = _useState2[0],
    openModal = _useState2[1];
  var defaultNodes = props.defaultNodes,
    onRemove = props.onRemove,
    draggable = props.draggable,
    onAdd = props.onAdd;
  var flowParams = {
    defaultNodes: defaultNodes,
    onRemove: onRemove,
    onAdd: onAdd,
    openModal: openModal,
    draggable: draggable
  };
  var flow = useFlow(flowParams);
  var handleCloseModal = function handleCloseModal() {
    return openModal(false);
  };
  useEffect(function () {
    var _containerRef$current;
    var width = (_containerRef$current = containerRef.current) == null ? void 0 : _containerRef$current.offsetWidth;
    if (width) {
      var x = width / 2 - 150;
      setHorizontal(x);
    }
  }, []);
  return React.createElement("div", {
    ref: containerRef,
    className: "react-flow-global-container",
    style: {
      width: '100%',
      height: '100vh'
    }
  }, horizontal && React.createElement(React.Fragment, null, React.createElement(ReactFlow, Object.assign({}, flow, {
    edgeTypes: FlowEdge$1,
    nodeTypes: FlowNode$1,
    snapToGrid: true,
    defaultViewport: {
      x: horizontal,
      y: 0,
      zoom: 2
    },
    minZoom: 1,
    maxZoom: 2,
    attributionPosition: "bottom-left"
  }), React.createElement(Controls, {
    showInteractive: false
  })), props.nodeTypes && React.createElement(Modal, {
    title: tt('Add node'),
    open: isOpen,
    onCancel: handleCloseModal,
    footer: [React.createElement(Button, {
      onClick: handleCloseModal
    }, tt('Close'))]
  }, React.createElement("div", {
    className: "flow-modal-add-container"
  }, props.nodeTypes.map(function (node) {
    return React.createElement(NodeTypeModal, Object.assign({
      key: node.id
    }, node, {
      onSubmit: flow.handleAdd(node),
      i18n: props.i18n
    }));
  })))));
};

export { Breadcrumb, Button, Flow, Icon, SelectAsync, Table, TextCollapse };
//# sourceMappingURL=isolib.esm.js.map
