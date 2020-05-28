import React from 'react';
import PropTypes from 'prop-types';
import { getRange, isValidIPItemValue } from './helper';
import './style.css';

export default class IPut extends React.Component {
  /**
   * set default props
   */
  static defaultProps = {
    className: '',
    defaultValue: '...',
    isError: () => false,
    onChange: new Function()
  }
  /**
   * set prop type
   */
  static propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.string || PropTypes.array,
    isError: PropTypes.func,
    onChange: PropTypes.func
  }
  /**
   * default state value
   */
  state = {
    value: []
  }

  componentDidMount() {
    let { defaultValue: value } = this.props;
    if (!Array.isArray(value)) {
      value = value.split('.');
    }
    this.setState({ value });
  }

  /**
   * Change Event
   */
  handleChange(e, i) {
    let val = parseInt(e.target.value);
    if (isNaN(e.target.value)) {
      return e.preventDefault();
    }

    if (e.target.value !== '' && !isValidIPItemValue(val)) {
      val = 255;
    }

    let value = this.state.value;
    value[i] = val;
    this.setState({ value }, () => this.onPropsChange());

    if (!isNaN(val) && String(val).length === 3 && i < 3) {
      this[`_input-${i + 1}`].focus();
    }
  }

  /**
   * Keydown Event
   */
  handleKeyDown(e, i) {
    /* 37 = ←, 39 = →, 8 = backspace, 190 = . */
    let domId = i;
    if ((e.keyCode === 37 || e.keyCode === 8) && getRange(e.target).end === 0 && i > 0) { domId = i - 1; }
    if (e.keyCode === 39 && getRange(e.target).end === e.target.value.length && i < 3) { domId = i + 1; }
    if (e.keyCode === 190) {
      e.preventDefault();
      if(i < 3) {
        domId = i + 1;
      }
    }
    this[`_input-${domId}`].focus();
  }

  /**
   * Paste Event
   */
  handlePaste(e, i) {
    if (!e.clipboardData || !e.clipboardData.getData) {
      return;
    }

    const pasteData = e.clipboardData.getData('text/plain');
    if (!pasteData) {
      return;
    }

    const value = pasteData.split('.').map(v => parseInt(v));
    if (value.length !== 4 - i) {
      return;
    }

    if (!value.every(isValidIPItemValue)) {
      return;
    }

    const { value: oldValue } = this.state;
    value.forEach((val, j) => {
      oldValue[i + j] = val;
    });

    this.setState({ value: oldValue }, () => this.onPropsChange());
    return e.preventDefault();
  }

  /**
   * call change props
   */
  onPropsChange() {
    const { value } = this.state;
    const ip = value.map(val => isNaN(val) ? '' : val).join('.');
    return this.props.onChange(ip);
  }

  render() {
    const { value } = this.state;
    const ip = value.map(val => isNaN(val) ? '' : val).join('.');

    const className = [
      'react-ip-input',
      this.props.className,
      this.props.isError(ip) ? 'has-error' : ''
    ].join(' ');

    return (
      <div className={className}>
        {value.map((val, i) =>
          <div className="react-ip-input__item" key={i}>
            <input
              ref={el => this[`_input-${i}`] = el}
              type="text"
              value={isNaN(val) ? '' : val}
              onChange={e => this.handleChange(e, i)}
              onKeyDown={e => this.handleKeyDown(e, i)}
              onPaste={e => this.handlePaste(e, i)}
            />
            {i !== 3 ? <i>.</i> : false}
          </div>
        )}
      </div>
    );
  }
}