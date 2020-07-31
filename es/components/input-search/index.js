import 'antd/es/row/style';
import _Row from 'antd/es/row';
import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/icon/style';
import _Icon from 'antd/es/icon';
import 'antd/es/col/style';
import _Col from 'antd/es/col';
import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _createSuper from '@babel/runtime/helpers/esm/createSuper';
import 'antd/es/date-picker/style';
import _DatePicker from 'antd/es/date-picker';
import React from 'react';
import { disabledDate } from '@/utils/function';
import './index.css'; // eslint-disable-next-line no-unused-vars

var RangePicker = _DatePicker.RangePicker;

var App = /*#__PURE__*/ (function(_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);
    _this.state = {
      input: _this.props.defaultValue,
      period: null
    };
    _this.onInputChange = _this.onInputChange.bind(_assertThisInitialized(_this));
    _this.onSearch = _this.onSearch.bind(_assertThisInitialized(_this));
    _this.onPeriodChange = _this.onPeriodChange.bind(_assertThisInitialized(_this));
    _this.emitEmpty = _this.emitEmpty.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [
    {
      key: 'onSearch',
      value: function onSearch() {
        this.props.onSearch(this.state.input, this.state.period);
      }
    },
    {
      key: 'onInputChange',
      value: function onInputChange(e) {
        this.setState({
          input: e.target.value
        });
      }
    },
    {
      key: 'emitEmpty',
      value: function emitEmpty() {
        this.setState({
          input: ''
        });
      }
    },
    {
      key: 'onPeriodChange',
      value: function onPeriodChange(date) {
        this.setState({
          period: {
            startTime: date[0].hour(0).minutes(0),
            endTime: date[1].hour(23).minutes(59)
          }
        });
      }
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          label = _this$props.label,
          hadTimeFilter = _this$props.hadTimeFilter;
        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'search-tab'
          },
          /*#__PURE__*/ React.createElement(
            _Row,
            {
              gutter: 6
            },
            /*#__PURE__*/ React.createElement(
              _Col,
              {
                span: 2
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'label-text'
                },
                label,
                '\uFF1A'
              )
            ),
            /*#__PURE__*/ React.createElement(
              _Col,
              {
                span: 6
              },
              /*#__PURE__*/ React.createElement(_Input, {
                value: this.state.input,
                onChange: this.onInputChange,
                suffix: this.state.input
                  ? /*#__PURE__*/ React.createElement(_Icon, {
                      type: 'close-circle',
                      onClick: this.emitEmpty
                    })
                  : null
              })
            ),
            /*#__PURE__*/ React.createElement(
              _Col,
              {
                span: 1
              },
              /*#__PURE__*/ React.createElement(_Button, {
                shape: 'circle',
                icon: 'search',
                onClick: this.onSearch
              })
            )
          ),
          hadTimeFilter
            ? /*#__PURE__*/ React.createElement(
                _Row,
                {
                  gutter: 6
                },
                /*#__PURE__*/ React.createElement(
                  _Col,
                  {
                    span: 2
                  },
                  /*#__PURE__*/ React.createElement(
                    'span',
                    {
                      className: 'label-text'
                    },
                    '\u652F\u4ED8\u65F6\u95F4\uFF1A'
                  )
                ),
                /*#__PURE__*/ React.createElement(
                  _Col,
                  {
                    span: 6
                  },
                  /*#__PURE__*/ React.createElement(RangePicker, {
                    disabledDate: disabledDate,
                    onChange: this.onPeriodChange
                  })
                )
              )
            : null
        );
      }
    }
  ]);

  return App;
})(React.Component);

App.propTypes = {
  onSearch: React.PropTypes.func
};
App.defaultProps = {
  laebl: '',
  defaultValue: '',
  hadTimeFilter: false
};
export default App;
