/** @jsx React.DOM */
'use strict';

var React = require('react');
var _ = require('lodash');
var BabyStore = require('../stores/baby-store');
var Actions = require('../actions/view-actions');
var Navigation = require('react-router').Navigation;
var FractionalStepper = require('./FractionalStepper.jsx');
var Wizard = require('./Wizard.jsx');
var FeederList = require('./FeederList.jsx');
var uuid = require('../utils/uuid');
var fractions = require('../utils/fractions');

var getFractionalDisplay = function (whole, frac) {
  if (frac === 0) {
    return whole.toString();
  }

  var fractionalDisplay;
  if (_.isObject(frac)) {
    fractionalDisplay = frac.displayValue;
  } else {
    fractionalDisplay = _.find(fractions, {actualValue: frac}).displayValue;
  }

  return whole + fractionalDisplay;
}

var View1 = React.createClass({
  _setValue: function (e) {
    var obj = {};
    obj[e.target.name] = e.target.value;
    this.props.onChange(obj);
  },

  render: function () {

    return (
      <div className="get-started">
        <h3>First things first. What are their names?</h3>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            defaultValue={this.props.initialState ? this.props.initialState.query.lastname : ''}
            onChange={this._setValue}
          />
        </div>
        <div>
          <label htmlFor="babyA">Baby A</label>
          <input
            type="text"
            name="babyA"
            placeholder="First Name"
            defaultValue={this.props.initialState ? this.props.initialState.babyA : ''}
            onChange={this._setValue}
          />
        </div>
        <div>
          <label htmlFor="babyB">Baby B</label>
          <input
            type="text"
            name="babyB"
            placeholder="First Name"
            defaultValue={this.props.initialState ? this.props.initialState.babyB : ''}
            onChange={this._setValue}
          />
        </div>
      </div>
    );
  }
});

var View2 = React.createClass({
  _updateHours: function (val) {
    if (val.full) {
      this.props.onChange({
        fullHours: val.amount
      });
    } else {
      this.props.onChange({
        fracHours: val.amount
      });
    }
  },

  _updateOunces: function (val) {
    if (val.full) {
      this.props.onChange({
        fullOunces: val.amount
      });
    } else {
      this.props.onChange({
        fracOunces: val.amount
      });
    }
  },

  render: function () {
    var initialOunces, initialHours;
    var _state = this.props.initialState;
    if (_state.fullOunces) {
      var fracOunces = _.isObject(_state.fracOunces) ? _state.fracOunces.actualValue : _state.fracOunces;
      initialOunces = _state.fullOunces + fracOunces;
    }

    if (_state.fullOunces) {
      var fracHours = _.isObject(_state.fracHours) ? _state.fracHours.actualValue : _state.fracHours;
      initialHours = _state.fullHours + fracHours;
    }

    return (
      <div className="get-started">
        <h3>Next, tell us about how often {_state.babyA} and {_state.babyB} usually eat/take a bottle.</h3>
        <div>
          <h4>About every</h4>
          <FractionalStepper
            onChange={this._updateHours}
            label="Hrs."
            initialValue={initialHours ? initialHours : 2}
          />
        </div>
        <h3>And how much milk/formula, on average, do they take per feeding?</h3>
        <div>
          <h4>About</h4>
          <FractionalStepper
            onChange={this._updateOunces}
            label="Oz."
            initialValue={initialOunces ? initialOunces : 4}
          />
        </div>
      </div>
    );
  }
});

var View3 = React.createClass({
  _onChange: function (val) {
    this.props.onChange({ feeders: val })
  },

  render: function () {

    return (
      <div className="get-started">
        <h3>Last, but not least, give us the names of a few people who will be taking care of them and might want to use this app.</h3>
        <FeederList
          onChange={this._onChange}
          feeders={this.props.initialState.feeders ? this.props.initialState.feeders : this.props.initialFeeders}
        />
      </div>
    );
  }
});

var View4 = React.createClass({
  render: function () {
    var info = this.props.info;

    return (
      <div className="get-started">
        <h3>OK. Let’s review what we have. If it all looks good, click “Done” and we’ll get going!</h3>
        <h4>{info.babyA} and {info.babyB} {info.query.lastname}</h4>
        <ul>
          <li>Eat about {getFractionalDisplay(info.fullOunces, info.fracOunces)} ounces, every {getFractionalDisplay(info.fullHours, info.fracHours)} hours.</li>
          <li>The people who should show up in the caretakers list are:
            <ul>
              {_.map(info.feeders, function (feeder) {
                return <li>{feeder.name}</li>;
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
  }
});

var GetStarted = React.createClass({
  mixins: [Navigation],

  getInitialState: function () {
    return {
      feeders: [
        {
          id: uuid.getUUID(),
          name: 'Mommy',
        },
        {
          id: uuid.getUUID(),
          name: 'Daddy',
        }
      ],
      query: this.props.query,
      editing: null
    }
  },

  _setStateFromChildren: function (state) {
    this.setState(state, function () {
      console.log(this.state);
    });
  },

  _logItOut: function (e) {
    e.preventDefault();
    console.log(this.state);
  },

  render: function () {
    return (
      <Wizard
        initialState={this.props.query}
        views={[
          <View1 initialState={this.state} onChange={this._setStateFromChildren}/>,
          <View2 initialState={this.state} onChange={this._setStateFromChildren}/>,
          <View3
            initialState={this.state}
            initialFeeders={this.state.feeders}
            onChange={this._setStateFromChildren}
          />,
          <View4 info={this.state} onFinish={this._logItOut}/>
        ]}
      />
    );
  }
});

module.exports = GetStarted;
