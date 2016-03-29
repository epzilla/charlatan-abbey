/** @jsx React.DOM */
'use strict';

var React = require('react');
var cx = require('classnames');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var Feeder = React.createClass({

  handleSubmit: function (e) {
    e.preventDefault();
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy(e);
    }
  },

  handleEdit: function () {
    this.props.onEdit();
    this.setState({editText: this.props.feeder.name});
  },

  handleKeyDown: function (e) {
    if (e.which === ESCAPE_KEY) {
      this.setState({editText: this.props.feeder.name});
      this.props.onCancel(e);
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit(e);
    }
  },

  handleChange: function (e) {
    if (this.props.editing) {
      this.setState({editText: e.target.value});
    }
  },

  getInitialState: function () {
    return {editText: this.props.feeder.name};
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return (
      nextProps.feeder !== this.props.feeder ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  },

  componentDidUpdate: function (prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = React.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(0, node.value.length);
    }
  },

  render: function () {
    var that = this;

    return (

      <li className={cx({
        editing: this.props.editing
      })}>
        <div className="view">
          <label onClick={this.handleEdit} onTouchEnd={function (e) {
            e.preventDefault();
            e.stopPropagation();
            that.handleEdit();
          }}>
            {this.props.feeder.name}
          </label>
          <button className="btn btn-destroy" onClick={this.props.onDestroy}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
});

module.exports = Feeder;
