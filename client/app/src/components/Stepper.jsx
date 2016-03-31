import React from 'react';
import cx from 'classnames';
import { fractions } from '../utils/fractions';

const StepperBtn = React.createClass({

  render: function () {
    let btnClasses = cx({
      'btn': true,
      'btn-invert': true,
      'stepper-btn': true,
      'top-btn': this.props.btnPos === 'top',
      'bottom-btn': this.props.btnPos === 'bottom'
    });

    let iClass = cx({
      'fa': true,
      'fa-angle-up': this.props.btnPos === 'top',
      'fa-angle-down': this.props.btnPos === 'bottom'
    });

    let dir = this.props.btnPos === 'top' ? 'up' : 'down';

    return (
      <button className={btnClasses} data-direction={dir} onClick={this.props.onClick}>
        <i className={iClass}></i>
      </button>
    );
  }
});

const Stepper = React.createClass({

  _fractionalPointer: 0,

  _stepDown: function (e) {
    e.preventDefault();
    return this.props.full ? this._stepDownFull() : this._stepDownFractional();
  },

  _stepUp: function (e) {
    e.preventDefault();
    return this.props.full ? this._stepUpFull() : this._stepUpFractional();
  },

  _stepUpFull: function () {
    let curVal = parseInt(this.state.val);

    if (this.props.max && curVal === this.props.max) {
      if (this.props.wrap) {
        curVal = this.props.min;
      }
    } else {
      curVal++;
    }

    if (this.props.padSingleDigits && curVal < 10) {
      curVal = '0' + curVal;
    }

    this.setState({
      val: curVal
    });
    this.props.onChange({
      full: true,
      amount: curVal
    });
  },

  _stepUpFractional: function () {
    let fracPointer = this.state.fraction;

    if (fracPointer !== 5) {
      fracPointer++;
    } else {
      fracPointer = 0;
    }

    this.setState({
      fraction: fracPointer,
      val: fractions[fracPointer].displayValue
    });
    this.props.onChange({
      full: false,
      amount: fractions[fracPointer]
    });
  },

  _stepDownFull: function () {
    let curVal = parseInt(this.state.val);

    if (this.props.min && curVal === this.props.min) {
      if (this.props.wrap) {
        curVal = this.props.max;
      }
    } else {
      curVal--;
    }

    if (this.props.padSingleDigits && curVal < 10) {
      curVal = '0' + curVal;
    }

    this.setState({
      val: curVal
    });
    this.props.onChange({
      full: true,
      amount: curVal
    });
  },

  _stepDownFractional: function () {
    let fracPointer = this.state.fraction;

    if (fracPointer !== 0) {
      fracPointer--;
    } else {
      fracPointer = 5;
    }

    this.setState({
      fraction: fracPointer,
      val: fractions[fracPointer].displayValue
    });
    this.props.onChange({
      full: false,
      amount: fractions[fracPointer]
    });
  },

  getInitialState: function () {
    if (this.props.full) {
      let val = this.props.initialValue ? this.props.initialValue : 2;
      if (this.props.padSingleDigits && val < 10) {
        val = '0' + val;
      }
      return {
        val: val,
        fraction: 0
      };
    } else if (this.props.initialValue === 0.25) {
        return {
          val: '¼',
          fraction: 1
        };
    } else if (this.props.initialValue === 0.5) {
      return {
        val: '½',
        fraction: 3
      };
    } else if (this.props.initialValue === 0.75) {
      return {
        val: '¾',
        fraction: 5
      };
    } else if (this.props.initialValue > 0.5) {
      return {
        val: '⅔',
        fraction: 4
      };
    } else if (this.props.initialValue > 0.25) {
      return {
        val: '⅓',
        fraction: 2
      };
    } else {
      return {
        val: '--',
        fraction: 0
      };
    }
  },

  render: function () {
    let full = this.props.full;
    let classes = cx({
      'stepper': true,
      'stepper-full': full,
      'stepper-fractional': !full
    });

    return (
      <div className={classes}>
        <StepperBtn btnPos='top' onClick={this._stepUp}/>
        <span>{this.state.val}</span>
        <StepperBtn btnPos='bottom' onClick={this._stepDown}/>
      </div>
    );
  }
});

export default Stepper;