import 'antd/es/table/style';
import _Table from 'antd/es/table';
import _toConsumableArray from '@babel/runtime/helpers/esm/toConsumableArray';
import _extends from '@babel/runtime/helpers/esm/extends';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import _objectWithoutProperties from '@babel/runtime/helpers/esm/objectWithoutProperties';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import React from 'react';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import 'antd/dist/antd.css';
import './DragTable.css';
var dragingIndex = -1;

var BodyRow = /*#__PURE__*/ (function(_React$Component) {
  _inherits(BodyRow, _React$Component);

  var _super = _createSuper(BodyRow);

  function BodyRow() {
    _classCallCheck(this, BodyRow);

    return _super.apply(this, arguments);
  }

  _createClass(BodyRow, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          isOver = _this$props.isOver,
          connectDragSource = _this$props.connectDragSource,
          connectDropTarget = _this$props.connectDropTarget,
          restProps = _objectWithoutProperties(_this$props, [
            'isOver',
            'connectDragSource',
            'connectDropTarget'
          ]);

        var style = _objectSpread(
          _objectSpread({}, restProps.style),
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
            /*#__PURE__*/ React.createElement(
              'tr',
              _extends({}, restProps, {
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
})(React.Component);

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
var DragableBodyRow = DropTarget('row', rowTarget, function(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
})(
  DragSource('row', rowSource, function(connect) {
    return {
      connectDragSource: connect.dragSource()
    };
  })(BodyRow)
);

var DragSortingTable = /*#__PURE__*/ (function(_React$Component2) {
  _inherits(DragSortingTable, _React$Component2);

  var _super2 = _createSuper(DragSortingTable);

  function DragSortingTable(props) {
    var _this;

    _classCallCheck(this, DragSortingTable);

    _this = _super2.call(this, props);
    _this.components = {
      body: {
        row: DragableBodyRow
      }
    };
    _this.state = {
      data: _toConsumableArray(props.data),
      columns: _toConsumableArray(props.columns),
      loading: props.loading
    };
    return _this;
  }

  _createClass(DragSortingTable, [
    {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        this.setState({
          data: _toConsumableArray(nextProps.data),
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
          update(this.state, {
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

        return /*#__PURE__*/ React.createElement(_Table, {
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
})(React.Component);

var WrapDragTable = DragDropContext(HTML5Backend)(DragSortingTable);
export default WrapDragTable;
