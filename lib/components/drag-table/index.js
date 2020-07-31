'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

require('antd/es/table/style');

var _table = _interopRequireDefault(require('antd/es/table'));

var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
);

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _objectSpread2 = _interopRequireDefault(require('@babel/runtime/helpers/objectSpread2'));

var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
);

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _inherits2 = _interopRequireDefault(require('@babel/runtime/helpers/inherits'));

var _createSuper2 = _interopRequireDefault(require('@babel/runtime/helpers/createSuper'));

var _react = _interopRequireDefault(require('react'));

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = _interopRequireDefault(require('react-dnd-html5-backend'));

var _immutabilityHelper = _interopRequireDefault(require('immutability-helper'));

require('antd/dist/antd.css');

require('./DragTable.css');

var dragingIndex = -1;

var BodyRow = /*#__PURE__*/ (function(_React$Component) {
  (0, _inherits2.default)(BodyRow, _React$Component);

  var _super = (0, _createSuper2.default)(BodyRow);

  function BodyRow() {
    (0, _classCallCheck2.default)(this, BodyRow);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(BodyRow, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          isOver = _this$props.isOver,
          connectDragSource = _this$props.connectDragSource,
          connectDropTarget = _this$props.connectDropTarget,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, [
            'isOver',
            'connectDragSource',
            'connectDropTarget'
          ]);
        var style = (0, _objectSpread2.default)(
          (0, _objectSpread2.default)({}, restProps.style),
          {},
          {
            cursor: 'move'
          }
        );
        var className = restProps.className;

        if (isOver) {
          if (restProps.index > dragingIndex) {
            className += ' drop-over-downward';
          }

          if (restProps.index < dragingIndex) {
            className += ' drop-over-upward';
          }
        }

        return connectDragSource(
          connectDropTarget(
            /*#__PURE__*/ _react.default.createElement(
              'tr',
              (0, _extends2.default)({}, restProps, {
                className: className,
                style: style
              })
            )
          )
        );
      }
    }
  ]);
  return BodyRow;
})(_react.default.Component);

var rowSource = {
  beginDrag: function beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};
var rowTarget = {
  drop: function drop(props, monitor) {
    var dragIndex = monitor.getItem().index;
    var hoverIndex = props.index; // Don't replace items with themselves

    if (dragIndex === hoverIndex) {
      return;
    } // Time to actually perform the action

    props.moveRow(dragIndex, hoverIndex); // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.

    monitor.getItem().index = hoverIndex;
  }
};
var DragableBodyRow = (0, _reactDnd.DropTarget)('row', rowTarget, function(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
})(
  (0, _reactDnd.DragSource)('row', rowSource, function(connect) {
    return {
      connectDragSource: connect.dragSource()
    };
  })(BodyRow)
);

var DragSortingTable = /*#__PURE__*/ (function(_React$Component2) {
  (0, _inherits2.default)(DragSortingTable, _React$Component2);

  var _super2 = (0, _createSuper2.default)(DragSortingTable);

  function DragSortingTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DragSortingTable);
    _this = _super2.call(this, props);
    _this.components = {
      body: {
        row: DragableBodyRow
      }
    };
    _this.state = {
      data: (0, _toConsumableArray2.default)(props.data),
      columns: (0, _toConsumableArray2.default)(props.columns),
      loading: props.loading
    };
    return _this;
  }

  (0, _createClass2.default)(DragSortingTable, [
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.setState({
          data: (0, _toConsumableArray2.default)(nextProps.data),
          loading: nextProps.loading
        });
      }
    },
    {
      key: 'moveRow',
      value: function moveRow(record, index, dragIndex, hoverIndex) {
        var data = this.state.data;
        var dragRow = data[dragIndex];
        var dropRow = data[hoverIndex];
        this.setState(
          (0, _immutabilityHelper.default)(this.state, {
            data: {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRow]
              ]
            }
          })
        );
        this.props.onChangeSort({
          dragRow: dragRow,
          dropRow: dropRow,
          srcPos: dragIndex,
          destPos: hoverIndex
        });
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return /*#__PURE__*/ _react.default.createElement(_table.default, {
          bordered: true,
          loading: this.state.loading,
          columns: this.state.columns,
          dataSource: this.state.data,
          components: this.components,
          pagination: false,
          onRow: function onRow(record, index) {
            return {
              index: index,
              moveRow: _this2.moveRow.bind(_this2, record, index)
            };
          }
        });
      }
    }
  ]);
  return DragSortingTable;
})(_react.default.Component);

var WrapDragTable = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend.default)(DragSortingTable);
var _default = WrapDragTable;
exports.default = _default;
